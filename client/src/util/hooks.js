import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  //setValues function name,
  //maps the initialState and stores into values
  const [values, setValues] = useState(initialState);

  //onChange is called when there are changed made in input fields
  //and those values are stored into the values variables by this functions
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  //onSubmit runs the callback() funtion that was passed to it
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  //returns onChange, onSubmit, values so they can be accessed
  return {
    onChange,
    onSubmit,
    values,
  };
};
