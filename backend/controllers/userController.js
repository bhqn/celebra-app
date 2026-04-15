import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      addresses: address
        ? [{ ...address, isDefault: true }]
        : [],
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        addresses: user.addresses,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "E-mail ou senha inválida" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ADD ADDRESS
export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.addresses.push(req.body);

    const updatedUser = await user.save();

    return res.json(updatedUser.addresses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ADDRESSES
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    return res.json(user.addresses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// REMOVE ADDRESS
export const removeAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== addressId
    );

    const updatedUser = await user.save();

    return res.json(updatedUser.addresses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// SET DEFAULT ADDRESS
export const setDefaultAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);

    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id.toString() === addressId;
    });

    const updatedUser = await user.save();

    return res.json(updatedUser.addresses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};