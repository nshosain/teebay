import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

//endpoint for graphql server
const httpLink = new createHttpLink({
  uri: "http://localhost:5000",
});

//this function gets the jwttoken
//and sets as authorization header
const authLink = setContext(() => {
  //gets jwt token
  const token = localStorage.getItem("jwtToken");

  //returns bearer token
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//initiating client
const client = new ApolloClient({
  //concatinates the token witht the server endpoint
  //this sets up the headers, and puts the bearer token
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//exporting provider so that it can be imported in index.js
export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
