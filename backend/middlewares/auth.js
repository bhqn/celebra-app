import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    console.log("HEADER:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("❌ Sem token");
      return res.status(401).json({ message: "Sem token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ USER:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("❌ ERRO JWT:", error.message);
    return res.status(401).json({ message: "Token inválido" });
  }
};