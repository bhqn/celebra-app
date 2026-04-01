import Order from "../models/order.js";
import Product from "../models/products.js";

// Step 1: Criar pedido
export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { dataEvento, horaInicio, duracao, tipoEvento, tipoPersonalizado, local, convidados } = req.body;

  try {
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

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Step 2/3: Adicionar produto ao carrinho do pedido
export const addProductToOrder = async (req, res) => {
  const { orderId } = req.params;
  const { productId, quantidade, sabores } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Produto não encontrado" });

    // 🔥 verifica se já existe no carrinho
    const existingProduct = order.carrinho.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      // soma quantidade
      existingProduct.quantidade += quantidade;
    } else {
      // adiciona novo
      order.carrinho.push({
        productId,
        quantidade,
        preco: product.preco,
        sabores
      });
    }

    // recalcula total
    order.total = order.carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );

    await order.save();
    res.status(200).json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remover produto do carrinho
export const removeProductFromOrder = async (req, res) => {
  const { orderId, productId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

    order.carrinho = order.carrinho.filter(p => p.productId.toString() !== productId);
    order.total = order.carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter pedido completo
export const getOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate("carrinho.productId");
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Finalizar pedido (checkout)
export const checkoutOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

    order.status = "pago";
    await order.save();
    res.status(200).json({ message: "Pedido finalizado com sucesso", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};