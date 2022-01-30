// email vaildator text
const regEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//registration valdiator
module.exports.validateRegisterInput = (
  first_name,
  last_name,
  address,
  phone,
  email,
  password
) => {
  const errors = {};
  if (first_name.trim() === "") {
    errors.first_name = "Firstname must not be empty";
  }
  if (last_name.trim() === "") {
    errors.last_name = "Lastname must not be empty";
  }
  if (address.trim() === "") {
    errors.address = "Address must not be empty";
  }
  if (phone.trim() === "") {
    errors.phone = "Phone must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

//login validator
module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

//product valdiator
module.exports.validateProductInput = (
  product_name,
  product_details,
  category,
  sell_price,
  rent_price
) => {
  const errors = {};
  if (product_name.trim() === "") {
    errors.product_name = "Product Name must not be empty";
  }
  if (product_details.trim() === "") {
    errors.product_details = "Product Details must not be empty";
  }
  if (category.trim() === "") {
    errors.category = "Category must not be empty";
  }
  if (sell_price.trim() === "") {
    errors.sell_price = "Sell Price must not be empty";
  }
  if (rent_price.trim() === "") {
    errors.rent_price = "Rent Price must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
