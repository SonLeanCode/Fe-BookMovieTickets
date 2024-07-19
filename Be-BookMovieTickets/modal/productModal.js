const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const product = new Schema({
  id: { type: ObjectId },
  name: {
    type: String,
  },
  image: { type: String },
  hotdeal: { type: String },
  description: { type: String },
  //   category: { type: ObjectId, ref: "category" }, // khoa ngoai
});
module.exports = mongoose.models.product || mongoose.model("product", product);
