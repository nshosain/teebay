const { gql } = require("apollo-server");

module.exports = gql`
  # # # # # #    T Y P E S    # # # # # #
  type Product {
    id: ID!
    product_name: String!
    product_details: String!
    ownner_id: ID!
    owner_name: String!
    category: String!
    sell_price: String!
    rent_price: String!
    is_sold: String!
    is_lent: String!
    bought_by_user: String
    borrowed_by_user: String
    created_at: String!
  }
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    address: String!
    phone: String
    email: String!
    token: String!
  }
  # # # # # #    I N P U T S    # # # # # #
  input RegisterInput {
    first_name: String!
    last_name: String!
    address: String!
    phone: String!
    email: String!
    password: String!
  }
  # # # # # #    Q U E R I E S    # # # # # #
  type Query {
    getProducts: [Product]
    getProduct(product_id: ID!): Product
    getUser(user_id: ID!): User
  }
  # # # # # #    M U T A T I O N S    # # # # # #
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createProduct(
      product_name: String!
      product_details: String!
      category: String!
      sell_price: String!
      rent_price: String!
    ): Product!
    deleteProduct(product_id: ID!): String!
    buyProduct(product_id: ID!): Product!
    rentProduct(product_id: ID!, from_date: String, to_date: String): Product!
  }
`;
