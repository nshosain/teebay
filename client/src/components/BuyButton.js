//DOES NOT WORK
//CAN NOT BUY PRODUCT FROM FRONTEND
//CAN NOT GET id as ID!
//FUNNY THING -> DOES NOT WORK AS String! either
//CHANGED SERVER SIDE CODE -> GrapgQL Mutation Defs to String!
//WORKS IN APOLLOQUERY CHECKER, BUT SAME ISSUE ON THE CLIENT
//SAYS I DID NOT SUPPLY TYPE String!
//WASTED WHOLE DAY ON THIS -__-

import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function BuyButton({ product: { id } }) {
  //mutation query
  const [buyProduct] = useMutation(BUY_PRODUCT_MUTATION, {
    variables: { product_id: id },
  });

  //used to check type of id from product -> id
  const idTypeChecker = () => {
    console.log(typeof id);
  };

  return (
    <Button animated="vertical" onClick={buyProduct} color="teal">
      <Button.Content hidden>Buy</Button.Content>
      <Button.Content visible>
        <Icon name="shop" />
      </Button.Content>
    </Button>
  );
}

//buyProduct mutation
const BUY_PRODUCT_MUTATION = gql`
  mutation buyProduct($id: ID!) {
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
