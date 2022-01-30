const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  address: String,
  phone: String,
  email: String,
  password: String,
});

module.exports = model("User", userSchema);
