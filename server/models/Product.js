const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  product_name: String,
  product_details: String,
  ownner_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  owner_name: String,
  category: String,
  sell_price: String,
  rent_price: String,
  is_sold: String,
  is_lent: String,
  bought_by_user: String,
  borrowed_by_user: String,
  borrowed_from_date: String,
  borrowed_till_date: String,
  created_at: String,
});

module.exports = model("Product", productSchema);
