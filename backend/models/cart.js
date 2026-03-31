const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" }, // IMPORTANTE (tipo iFood)
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number // snapshot do preço
    }
  ],
  total: Number
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);