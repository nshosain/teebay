import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

//object with empty user
const initialState = {
  user: null,
};

//if local storage contains jwt token
if (localStorage.getItem("jwtToken")) {
  //decoding the jwt token
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  //function checks if the jwt token has expired
  //in backend it's expiry is set to = 1 hour
  if (decodedToken.exp * 1000 < Date.now) {
    //if expired, remove the token
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

//reducer
function authReducer(state, action) {
  switch (action.type) {
    //when user logs in, user is set accordingly
    case "LOGIN":
      return {
        //spreading state
        ...state,
        //setting user
        user: action.payload,
      };
    //when user logs out, user is null
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  //login function
  function login(userData) {
    //storing jwt token in local storage to persist being logged in
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  //logout function
  function logout() {
    //removes jwt token from local storage
    localStorage.removeItem("jwtToken");

    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
