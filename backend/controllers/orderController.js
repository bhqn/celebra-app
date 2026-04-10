import Order from "../models/order.js";
import Product from "../models/products.js";

// Step 1: Criar pedido
export const createOrder = (req, res) => {
  const userId = req.user.id;
  const {
    dataEvento,
    horaInicio,
    duracao,
    tipoEvento,
    tipoPersonalizado,
    local,
    convidados,
  } = req.body;

  const order = new Order({
    userId,
    dataEvento,
    horaInicio,
    duracao,
    tipoEvento,
    tipoPersonalizado,
    local,
    convidados,
    products: [],
    total: 0,
  });

  order
    .save()
    .then((savedOrder) => {
      res.status(201).json(savedOrder);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const calculateTotal = async (order) => {
  await order.populate("products.productId");

  order.total = order.products.reduce((acc, p) => {
    return acc + p.productId.preco * p.quantity;
  }, 0);
};

// Step 2/3: Adicionar produto ao carrinho do pedido
export const addProductToOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { productId, quantity, sabores } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order não encontrada" });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const existing = order.products.find(
      (p) =>
        p.productId.toString() === productId &&
        JSON.stringify(p.sabores) === JSON.stringify(sabores),
    );

    if (existing) {
      existing.quantity += quantity || 1;
    } else {
      order.products.push({
        nome: product.nome,
        productId,
        quantity: quantity || 1,
        sabores,
      });
    }

    await calculateTotal(order);
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Remover produto do carrinho
export const removeProductFromOrder = async (req, res) => {
  const { orderId, productId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order não encontrada" });
  }

  order.products = order.products.filter(
    (p) => p.productId.toString() !== productId
  );
  
  if (order.userId.toString() !== req.user.id) {
  return res.status(403).json({ message: "Acesso negado" });
}
  await calculateTotal(order);
  await order.save();

  res.status(200).json(order);
};
// Obter pedido completo
export const getOrder = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate("products.productId");

  res.status(200).json(order);
};

export const updateProductInOrder = async (req, res) => {
  const { orderId, productId } = req.params;
  const { quantity } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order não encontrada" });
  }

  const item = order.products.find(
    (p) => p.productId.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  if (quantity <= 0) {
    order.products = order.products.filter(
      (p) => p.productId.toString() !== productId
    );
  } else {
    item.quantity = quantity;
  }

  if (order.userId.toString() !== req.user.id) {
  return res.status(403).json({ message: "Acesso negado" });
}

  await calculateTotal(order);
  await order.save();

  res.status(200).json(order);
};
// Finalizar pedido (checkout)
export const checkoutOrder = (req, res) => {
  const { orderId } = req.params;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      order.status = "pago";
      return order.save();
    })
    .then((updatedOrder) => {
      if (updatedOrder) {
        res.status(200).json({
          message: "Pedido finalizado com sucesso",
          order: updatedOrder,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// caso o order esteja no "iniciado", recupere o order
export const getCurrentOrder  = async (req, res) => {
  try {
    const userId = req.user.id;

    // procura order em andamento
    const order = await Order.findOne({
      userId,
      status: "iniciado",
    }).sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order não encontrada" });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    // limpa todos os produtos
    order.products = [];
    order.total = 0;

    await order.save();

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//atualizar a order

 export const updateOrder = async (req, res) => {
  const { id } = req.params;

  const updated = await Order.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

