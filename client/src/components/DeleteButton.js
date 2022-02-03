import React from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//getting FETCH_PRODUCTS_QUERY from graphql.js
import { FETCH_PRODUCTS_QUERY } from "../util/graphql";

//configuring Toast
toast.configure();

function DeleteButton({ product: { id } }) {
  //mutation query
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update(proxy, result) {
      //toast a messege telling user
      //product is deleted!
      toast.success(result.data.deleteProduct);
    },
    refetchQueries: (refetchProducts) => [{ query: FETCH_PRODUCTS_QUERY }],
  });

  return (
    <Modal
      trigger={
        <Button as="div" color="red" floated="right">
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      }
      header="Delete Product"
      content="Are you sure you want to delete this product?"
      actions={[
        <Button as="div" color="red" floated="right" onClick={deleteProduct}>
          Yes
        </Button>,
        "Cancel",
      ]}
    />
  );
}

//deleteProduct mutation
const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(product_id: $id)
  }
`;

export default DeleteButton;
