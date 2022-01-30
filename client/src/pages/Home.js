import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/auth";

//importing FETCH_PRODUCTS_QUERY from graphql file
import { FETCH_PRODUCTS_QUERY } from "../util/graphql";

function Home() {
  //getting user if logged in
  const { user } = useContext(AuthContext);

  //using useQuery to run graphQL query FETCH_PRODUCTS_QUERY, data in variable data
  const { loading, error, data } = useQuery(FETCH_PRODUCTS_QUERY);

  //if user logged in
  //shows all products and post product form
  //else shows only all products
  return user ? (
    //grid with post product feature and all products
    <Grid width={12}>
      <Grid.Row className="page-title">
        <h1>Recent Products</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <Grid.Column>
            <ProductForm />
          </Grid.Column>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid columns={2}>
            <Transition.Group>
              {loading ? (
                <h1>loading..</h1>
              ) : (
                data.getProducts &&
                data.getProducts.map((product) => (
                  <Grid.Column key={product.id}>
                    <ProductCard product={product} />
                  </Grid.Column>
                ))
              )}
            </Transition.Group>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    //grid showing only all products
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Products</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Grid columns={3}>
            {loading ? (
              <h1>loading..</h1>
            ) : (
              data.getProducts &&
              data.getProducts.map((product) => (
                <Grid.Column key={product.id}>
                  <ProductCard product={product} />
                </Grid.Column>
              ))
            )}
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
