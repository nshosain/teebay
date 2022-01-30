const { AuthenticationError } = require("apollo-server");

const Product = require("../../models/Product");
const checkAuth = require("../../util/check-auth");
const { UserInputError } = require("apollo-server");

//getting create product args validator
const { validateProductInput } = require("../../util/validators");

module.exports = {
  // # # # # # #  -  Q U E R I E S  -  # # # # # #
  Query: {
    // # # # # # #    GET PRODUCTS    # # # # # #
    async getProducts() {
      try {
        //shows products in a LIFO fashion by desending the query results on created_at
        const products = await Product.find().sort({ created_at: -1 });
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    // # # # # # #    GET PRODUCT    # # # # # #
    async getProduct(parent, { product_id }) {
      try {
        const product = await Product.findById(product_id);
        if (product) {
          return product;
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  // # # # # # #  -  M U T A T I O N S  -  # # # # # #
  Mutation: {
    // # # # # # #    CREATE PRODUCT   # # # # # #
    async createProduct(
      parent,
      { product_name, product_details, category, sell_price, rent_price },
      context
    ) {
      const { errors, valid } = validateProductInput(
        product_name,
        product_details,
        category,
        sell_price,
        rent_price
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      //checking user validation
      const user = checkAuth(context);

      const newProduct = new Product({
        product_name,
        product_details,
        ownner_id: user.id,
        owner_name: user.last_name,
        category,
        sell_price,
        rent_price,
        is_sold: "0",
        is_lent: "0",
        bought_by_user: "",
        borrowed_by_user: "",
        borrowed_from_date: "",
        borrowed_till_date: "",
        created_at: new Date().toISOString(),
      });

      const product = await newProduct.save();

      return product;
    },
    // # # # # # #    DELETE PRODUCT   # # # # # #
    async deleteProduct(parent, { product_id }, context) {
      const user = checkAuth(context);

      try {
        const product = await Product.findById(product_id);

        const product_owner_id = product.ownner_id.toHexString(); //converting ObjectID to string

        if (user.id === product_owner_id) {
          //if the product belongs to the creator, proceed to delete
          await Product.delete();
          return "Product Deleted Successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // # # # # # #    BUY PRODUCT   # # # # # #
    async buyProduct(parent, { product_id }, context) {
      const user = checkAuth(context);

      try {
        const product = await Product.findById(product_id);

        const product_owner_id = product.ownner_id.toHexString(); //converting ObjectID to string

        if (user.id === product_owner_id) {
          //can not buy own product
          throw new AuthenticationError("Can not buy own product");
        } else {
          console.log(user.id);
          //set is_sold to 1 meaning product is sold, and set buyer id as product.bought_by_user
          const updatedProduct = await Product.findOneAndUpdate(
            { _id: product_id },
            { $set: { bought_by_user: user.id, is_sold: "1" } },
            { new: true }
          );

          //returning new updated product
          return updatedProduct;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    //# # # # # #    RENT PRODUCT   # # # # # #
    async rentProduct(parent, { product_id, from_date, to_date }, context) {
      const user = checkAuth(context);

      try {
        const product = await Product.findById(product_id);

        const product_owner_id = product.ownner_id.toHexString(); //converting ObjectID to string

        if (user.id === product_owner_id) {
          //can not rent own product
          throw new AuthenticationError("Can not buy own product");
        } else {
          //set is_lent to 1 meaning product is being rented, and set user id as product.borrowed_by_user
          const updatedProduct = await Product.findOneAndUpdate(
            { _id: product_id },
            {
              $set: { borrowed_by_user: user.id, is_lent: "1" },
              //$set: { borrowed_from_date: from_date },
              //$set: { borrowed_till_date: to_date },
            },
            { new: true }
          );

          return updatedProduct;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
