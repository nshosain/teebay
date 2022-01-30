import gql from "graphql-tag";

//graphql query to get all products
export const FETCH_PRODUCTS_QUERY = gql`
  {
    getProducts {
      id
      product_name
      product_details
      ownner_id
      owner_name
      category
      sell_price
      rent_price
      is_sold
      is_lent
      bought_by_user
      borrowed_by_user
      created_at
    }
  }
`;
