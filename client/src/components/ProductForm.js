import React, { useState } from "react";
import { Form, Button, Select } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../util/hooks";

//getting FETCH_PRODUCTS_QUERY from graphql.js
import { FETCH_PRODUCTS_QUERY } from "../util/graphql";

function ProductForm() {
  //var that holds the categories and their values
  const categoryOptions = [
    {
      key: "1",
      text: "Electronics",
      value: "Electronics",
    },
    {
      key: "2",
      text: "Furniture",
      value: "Furniture",
    },
    {
      key: "3",
      text: "Home Appliances",
      value: "Home Appliances",
    },
    {
      key: "4",
      text: "Sporting Goods",
      value: "Sporting Goods",
    },
    {
      key: "5",
      text: "Outdoor",
      value: "Outdoor",
    },
    {
      key: "6",
      text: "Toys",
      value: "Toys",
    },
  ];

  //used for storing errors that were returned by the server
  const [errors, setErrors] = useState({});

  //gets onChange, onSubmit, values from useForm, hooks.js
  //onChange stores the data in respective vairables
  //onSubmit runs when onSubmit button is clicked
  //values are fields necessary for the CREATE_PRODUCT_MUTATION mutation to run
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    product_name: "",
    product_details: "",
    category: "Toys",
    sell_price: "",
    rent_price: "",
  });

  const resetFormValues = () => {
    values.product_name = "";
    values.product_details = "";
    values.category = "Toys";
    values.sell_price = "";
    values.rent_price = "";
  };

  //createProduct function that executes the graphql mutation CREATE_PRODUCT_MUTATION
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    //if there are errors
    onError(err) {
      //teebay server returns only one error object,
      //inside it contains the error, so need to access them this way
      //and set them to the errors variable
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    //values needed for mutation
    variables: values,
    // onError(error) {
    //   console.log(error);
    // },
    //update function gets the results of the mutation
    update(proxy, result) {
      //reading cache query
      const data = proxy.readQuery({
        query: FETCH_PRODUCTS_QUERY,
      });

      //writing added prdouct data to the cache
      proxy.writeQuery({
        query: FETCH_PRODUCTS_QUERY,
        data: [result.data.createProduct, ...data.getProducts],
      });

      //resting input fields of the create product form
      resetFormValues();
    },
    //persisting, rendering new data
    //fetching data from cache query results
    refetchQueries: (refetchProducts) => [{ query: FETCH_PRODUCTS_QUERY }],
  });

  //callback function, will be used in the hook
  function createPostCallBack() {
    createProduct();
  }

  return (
    <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
      <h2>Post a product:</h2>
      <Form.Field>
        <Form.Input
          label="Product Name"
          placeholder="Product's Name.."
          name="product_name"
          type="text"
          value={values.product_name}
          error={errors.product_name}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Product Details"
          placeholder="Give some details.."
          name="product_details"
          type="text"
          value={values.product_details}
          error={errors.product_details}
          onChange={onChange}
        ></Form.Input>
        <Form.Field
          control={Select}
          label="Category"
          options={categoryOptions}
          placeholder="Select Category"
          name="category"
          //value={values.category.value}
          //error={errors.category}
          //FOR SOME LAME SEMANTIC UI NO KNOWLEDHE I CAN NOT GET THIS DORPDOWN VALUE,
          //VALUE HADCODED, category -> Toys
          //onChange={onChange}
        />
        <Form.Input
          label="Sell Price"
          placeholder="Tk."
          name="sell_price"
          type="number"
          value={values.sell_price}
          error={errors.sell_price}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Rent Price"
          placeholder="TK."
          name="rent_price"
          type="number"
          value={values.rent_price}
          error={errors.rent_price}
          onChange={onChange}
        ></Form.Input>
      </Form.Field>
      <Button type="submit" color="teal">
        Post!
      </Button>
    </Form>
  );
}

const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct(
    $product_name: String!
    $product_details: String!
    $category: String!
    $sell_price: String!
    $rent_price: String!
  ) {
    createProduct(
      product_name: $product_name
      product_details: $product_details
      category: $category
      sell_price: $sell_price
      rent_price: $rent_price
    ) {
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

export default ProductForm;
