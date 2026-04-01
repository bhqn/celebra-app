import Cart from "../models/cart.js";

// Adicionar produto ao carrinho
export const addToCart = async (req, res) => {
  const userId = req.user.id; // vem do middleware auth
  const { products } = req.body;

  try {
    // Verifica se o usuário já tem carrinho
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Se já tem carrinho, adiciona os produtos
      cart.products.push(...products);
      await cart.save();
    } else {
      // Se não tem carrinho, cria um novo
      cart = new Cart({ userId, products });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar carrinho do usuário
export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Carrinho vazio" });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remover item do carrinho
export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Carrinho vazio" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};