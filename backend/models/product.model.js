// creating our product model
import mongoose from "mongoose";

// we need to create a schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // this object has the createdAt, updatedAt features
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
