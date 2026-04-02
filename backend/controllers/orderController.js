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
    convidados
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
    carrinho: [],
    total: 0
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

// Step 2/3: Adicionar produto ao carrinho do pedido
export const addProductToOrder = (req, res) => {
  const { orderId } = req.params;
  const { productId, quantidade, sabores } = req.body;

  let orderRef;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      orderRef = order;
      return Product.findById(productId);
    })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      const existingProduct = orderRef.carrinho.find(
        (p) => p.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantidade += quantidade;
      } else {
        orderRef.carrinho.push({
          productId,
          quantidade,
          preco: product.preco,
          sabores
        });
      }

      orderRef.total = orderRef.carrinho.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
      );

      return orderRef.save();
    })
    .then((updatedOrder) => {
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// Remover produto do carrinho
export const removeProductFromOrder = (req, res) => {
  const { orderId, productId } = req.params;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      order.carrinho = order.carrinho.filter(
        (p) => p.productId.toString() !== productId
      );

      order.total = order.carrinho.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
      );

      return order.save();
    })
    .then((updatedOrder) => {
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// Obter pedido completo
export const getOrder = (req, res) => {
  const { orderId } = req.params;

  Order.findById(orderId)
    .populate("carrinho.productId")
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
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
          order: updatedOrder
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};