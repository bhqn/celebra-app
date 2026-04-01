const StoreSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  deliveryFee: Number,
  deliveryTime: String
}, { timestamps: true });

export default mongoose.model("Store", StoreSchema);