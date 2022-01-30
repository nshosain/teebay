import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Register = () => {
  //using context
  const context = useContext(AuthContext);
  //now navigate can be used to redirect to other components/pages
  const navigate = useNavigate();
  //used for storing errors that were returned by the server
  const [errors, setErrors] = useState({});

  //initialState contains the map data that is needed for register mutation
  const initialState = {
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  };

  //gets onChange, onSubmit, values from useForm, hooks.js
  //onChange stores the data in respective vairables
  //onSubmit runs when onSubmit button is clicked
  //values are fields necessary for the REGISTER_USER mutation to run
  const { onChange, onSubmit, values } = useForm(regusterUser, initialState);

  //addUser function that executes the graphql mutation REGISTER_USER
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    //update function gets the results of the mutation
    update(proxy, { data: { register: userData } }) {
      //after registration, user is being logged in
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
    //values needed for mutation
    variables: values,
  });

  //callback function, will be used in the hook
  function regusterUser() {
    addUser();
  }

  //registration form
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="First Name"
          placeholder="First Name.."
          name="first_name"
          type="text"
          value={values.first_name}
          error={errors.first_name}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Last Name"
          placeholder="Last Name.."
          name="last_name"
          type="text"
          value={values.last_name}
          error={errors.last_name}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Address"
          placeholder="Address.."
          name="address"
          type="text"
          value={values.address}
          error={errors.address}
          onChange={onChange}
        ></Form.Input>
        <Form.Input
          label="Phone"
          placeholder="Phone.."
          name="phone"
          type="number"
          value={values.phone}
          error={errors.phone}
          onChange={onChange}
        ></Form.Input>
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
          Register
        </Button>
      </Form>
    </div>
  );
};

//grapqhQL mutation
const REGISTER_USER = gql`
  mutation register(
    $first_name: String!
    $last_name: String!
    $address: String!
    $phone: String!
    $email: String!
    $password: String!
  ) {
    register(
      registerInput: {
        first_name: $first_name
        last_name: $last_name
        address: $address
        phone: $phone
        email: $email
        password: $password
      }
    ) {
      id
      last_name
      email
      token
    }
  }
`;

export default Register;
