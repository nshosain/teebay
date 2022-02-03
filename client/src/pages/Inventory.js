import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  Grid,
  Tab,
  Segment,
  Header,
  Icon,
  Button,
  Container,
} from "semantic-ui-react";

import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/auth";

import { Link } from "react-router-dom";

//importing FETCH_PRODUCTS_QUERY from graphql file
import { FETCH_PRODUCTS_QUERY } from "../util/graphql";

//I wanted to make each of the panes
// individual COMPONENETS
//but could not complete it in due time
// this file is a bit large
//but had to keep it that way

function Inventory() {
  //used for counting products posted by a user
  //very inefficent I know
  let productsPosted = 0;
  //used for counting sold products of a user
  let productsSold = 0;
  //used for counting bought products of a user
  let productsBought = 0;
  //used for counting bought products of a user
  let productsRented = 0;

  //getting user if logged in
  const { user } = useContext(AuthContext);

  //using useQuery to run graphQL query FETCH_PRODUCTS_QUERY, data in variable data
  const { loading, data } = useQuery(FETCH_PRODUCTS_QUERY);

  //panes that load when tabs are selected
  //in the vertical tabs menu
  const panes = [
    {
      //all products posted by the user are shown here
      //in none exists, shows a container with a text and button
      //that redirects to home page
      //need to be converted to a my products componenet
      menuItem: "My Products",
      render: () => (
        <Tab.Pane>
          <Grid columns={2}>
            {loading ? (
              <h1>loading..</h1>
            ) : (
              data.getProducts &&
              data.getProducts.map(
                (product) =>
                  product.ownner_id === user.id &&
                  (productsPosted += 1) && (
                    <Grid.Column key={product.id}>
                      <ProductCard product={product} />
                    </Grid.Column>
                  )
              )
            )}
          </Grid>
          <Grid>
            {productsPosted === 0 && (
              <Segment placeholder className="segment-css">
                <Header icon>
                  <Icon name="warning" color="yellow" />
                  You have not posted any products yet!
                </Header>
                <Button color="teal" as={Link} to="/">
                  Post a product
                </Button>
              </Segment>
            )}
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      //all products posted and sold by the user are shown here
      //in none exists, shows a container with a text and button
      //that redirects to home page
      //need to be converted to a sold products componenet
      menuItem: "Sold Products",
      render: () => (
        <Tab.Pane>
          <Grid columns={2}>
            {loading ? (
              <h1>loading..</h1>
            ) : (
              data.getProducts &&
              data.getProducts.map(
                (product) =>
                  product.ownner_id === user.id &&
                  product.is_sold === "1" &&
                  (productsSold += 1) && (
                    <Grid.Column key={product.id}>
                      <ProductCard product={product} />
                    </Grid.Column>
                  )
              )
            )}
          </Grid>
          <Grid>
            {productsSold === 0 && (
              <Segment placeholder className="segment-css">
                <Header icon>
                  <Icon name="warning" color="yellow" />
                  You have not sold any products yet!
                </Header>
                <Button color="teal" as={Link} to="/">
                  Post a product
                </Button>
              </Segment>
            )}
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      //all products bought by the user are shown here
      //in none exists, shows a container with a text and button
      //that redirects to home page
      //need to be converted to a bought products componenet
      menuItem: "Products Bought",
      render: () => (
        <Tab.Pane>
          <Grid columns={2}>
            {loading ? (
              <h1>loading..</h1>
            ) : (
              data.getProducts &&
              data.getProducts.map(
                (product) =>
                  product.bought_by_user === user.id &&
                  ((productsBought += 1),
                  (
                    <Grid.Column key={product.id}>
                      <ProductCard product={product} />
                    </Grid.Column>
                  ))
              )
            )}
          </Grid>
          <Grid>
            {productsBought === 0 && (
              <Segment placeholder className="segment-css">
                <Header icon>
                  <Icon name="warning" color="yellow" />
                  You have not bought any products yet!
                </Header>
                <Button color="teal" as={Link} to="/">
                  Buy a product
                </Button>
              </Segment>
            )}
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      //all products rented by the user are shown here
      //in none exists, shows a container with a text and button
      //that redirects to home page
      //need to be converted to a rented products componenet
      menuItem: "Products Rented",
      render: () => (
        <Tab.Pane>
          <Grid columns={2}>
            {loading ? (
              <h1>loading..</h1>
            ) : (
              data.getProducts &&
              data.getProducts.map(
                (product) =>
                  product.rented_by_user === user.id &&
                  ((productsRented += 1),
                  (
                    <Grid.Column key={product.id}>
                      <ProductCard product={product} />
                    </Grid.Column>
                  ))
              )
            )}
          </Grid>
          <Grid>
            {productsRented === 0 && (
              <Segment placeholder className="segment-css">
                <Header icon>
                  <Icon name="warning" color="yellow" />
                  You have not rented any products yet!
                </Header>
                <Button color="teal" as={Link} to="/">
                  Rent a product
                </Button>
              </Segment>
            )}
          </Grid>
        </Tab.Pane>
      ),
    },
  ];

  //if user logged in
  //shows all products and post product form
  //else shows only all products
  return (
    user && (
      //grid showing only all products
      <Container>
        <Grid>
          <Grid.Row>
            <Tab
              className="pane-css"
              menu={{
                color: "teal",
                //borderless: true,
                inverted: true,
                attached: false,
                tabular: false,
              }}
              panes={panes}
            />
          </Grid.Row>
        </Grid>
      </Container>
    )
  );
}

export default Inventory;
