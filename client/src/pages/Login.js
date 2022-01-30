import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Login = () => {
  //using context
  const context = useContext(AuthContext);
  //now navigate can be used to redirect to other components/pages
  const navigate = useNavigate();
  //used for storing errors that were returned by the server
  const [errors, setErrors] = useState({});

  //initialState contains the map data that is needed for register mutation
  const initialState = {
    email: "",
    password: "",
  };

  //gets onChange, onSubmit, values from useForm, hooks.js
  //onChange stores the data in respective vairables
  //onSubmit runs when onSubmit button is clicked
  //values are fields necessary for the REGISTER_USER mutation to run
  const { onChange, onSubmit, values } = useForm(login, initialState);

  //addUser function that executes the graphql mutation REGISTER_USER
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    //update function gets the results of the mutation
    update(proxy, { data: { login: userData } }) {
      //uses login of context
      context.login(userData);
      //takes back to homepage after registration is done.
      navigate("/");
    },
    //if there are errors
    onError(err) {
      //teebay server returns only one error object,
      //inside it contains the error, so need to access them this way
      //and set them to the errors variable
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  //callback function, will be used in the hook
  function login() {
    loginUser();
  }

  //registration form
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
};

//grapqhQL mutation
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      last_name
      email
      token
    }
  }
`;

export default Login;
