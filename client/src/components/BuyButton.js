import React from "react";
import { Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//configuring Toast
toast.configure();

function BuyButton({ product: { id } }) {
  //mutation query
  const [buyProduct] = useMutation(BUY_PRODUCT_MUTATION, {
    variables: { id },
    update(proxy, results) {
      toast.success(`${results.data.buyProduct.product_name} Bought!`);
    },
  });

  return (
    <Button onClick={buyProduct} color="green">
      Buy
    </Button>
  );
}

//buyProduct mutation
const BUY_PRODUCT_MUTATION = gql`
  mutation buyProduct($id: String!) {
    buyProduct(product_id: $id) {
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

export default BuyButton;
