import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER
export const register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((userExists) => {
      if (userExists) {
        return res.status(400).json({ message: "Usuário já existe" });
      }

      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      if (!hashedPassword) return;

      return User.create({
        name,
        email,
        password: hashedPassword,
      });
    })
    .then((user) => {
      if (!user) return;

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  let userRef;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Usuário não encontrado" });
      }

      userRef = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: "Senha inválida" });
      }

      const token = jwt.sign(
        { id: userRef._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: {
          id: userRef._id,
          name: userRef.name,
          email: userRef.email,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// adicionar endereço
export const addAddress = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      user.addresses.push(req.body);
      return user.save();
    })
    .then((updatedUser) => {
      res.json(updatedUser.addresses);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// listar endereços
export const getAddresses = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      res.json(user.addresses);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// remover endereço
export const removeAddress = (req, res) => {
  const { addressId } = req.params;

  User.findById(req.user.id)
    .then((user) => {
      user.addresses = user.addresses.filter(
        (addr) => addr._id.toString() !== addressId
      );

      return user.save();
    })
    .then((updatedUser) => {
      res.json(updatedUser.addresses);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// definir padrão
export const setDefaultAddress = (req, res) => {
  const { addressId } = req.params;

  User.findById(req.user.id)
    .then((user) => {
      user.addresses.forEach((addr) => {
        addr.isDefault = addr._id.toString() === addressId;
      });

      return user.save();
    })
    .then((updatedUser) => {
      res.json(updatedUser.addresses);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};