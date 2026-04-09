import Cart from "../models/cart.js";

// Adicionar produto ao carrinho
export const addToCart = (req, res) => {
  console.log("BODY:", req.body);
  console.log("USER:", req.user);
  const userId = req.user.id;
  const { products } = req.body;

  Cart.findOne({ userId })
    .then((cart) => {
      if (cart) {
        cart.products.push(...products);
        return cart.save();
      } else {
        const newCart = new Cart({ userId, products });
        return newCart.save();
      }
    })
    .then((savedCart) => {
      res.status(200).json(savedCart);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// Listar carrinho do usuário
export const getCart = (req, res) => {
  const userId = req.user.id;

  Cart.findOne({ userId })
    .populate("products.productId")
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: "Carrinho vazio" });
      }
      res.status(200).json(cart);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// Remover item do carrinho
export const removeFromCart = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  Cart.findOne({ userId })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: "Carrinho vazio" });
      }

      cart.products = cart.products.filter(
        (p) => p.productId.toString() !== productId,
      );

      return cart.save();
    })
    .then((updatedCart) => {
      if (updatedCart) {
        res.status(200).json(updatedCart);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const updateCartItem = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  Cart.findOne({ userId })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: "Carrinho vazio" });
      }

      const item = cart.products.find(
        (p) => p.productId.toString() === productId,
      );

      if (!item) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      if (quantity <= 0) {
        cart.products = cart.products.filter(
          (p) => p.productId.toString() !== productId,
        );
      } else {
        item.quantity = quantity;
      }

      return cart.save();
    })
    .then((updatedCart) => {
      res.status(200).json(updatedCart);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
