const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);