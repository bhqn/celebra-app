import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  street: String,
  number: String,
  neighborhood: String,
  city: String,
  state: String,
  zipCode: String,
  complement: String,
  isDefault: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  addresses: [AddressSchema]
}, { timestamps: true });

export default mongoose.model("User", UserSchema);