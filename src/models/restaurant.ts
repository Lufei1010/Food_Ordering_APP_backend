import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
});

const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }], //array
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

//create the model based on the schema
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
