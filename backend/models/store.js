const StoreSchema = new mongoose.Schema({
  name: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: String,
  image: String
}, { timestamps: true });

export default mongoose.model("Store", StoreSchema);