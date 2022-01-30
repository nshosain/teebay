const User = require("../../models/User");
const jwt = require("jsonwebtoken");

//getting register args validator
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

//getting secret key in package.json
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");

//FUNCTIONS
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      last_name: user.last_name,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  // # # # # # #  -  Q U E R I E S  -  # # # # # #
  Query: {
    // # # # # # #    GET USER    # # # # # #
    async getUser(parent, { user_id }) {
      try {
        const user = await User.findById(user_id);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  // # # # # # #  -  M U T A T I O N S  -  # # # # # #
  Mutation: {
    // # # # # # #    L O G I N    # # # # # #
    async login(parent, { email, password }) {
      //valdiation
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      //get user by email
      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("Wrong credentials", { errors });
      }

      if (!(password === user.password)) {
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    // # # # # # #    R E G I S T R A T I O N   # # # # # #
    async register(
      parent,
      {
        registerInput: {
          first_name,
          last_name,
          address,
          phone,
          email,
          password,
        },
      }
    ) {
      //valdiation
      const { valid, errors } = validateRegisterInput(
        first_name,
        last_name,
        address,
        phone,
        email,
        password
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      //get user by email, checking in already exists
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("User already exists", {
          errors: {
            email: "User already exists!",
          },
        });
      }

      //if new user, continues creating
      const newUser = new User({
        first_name,
        last_name,
        address,
        phone,
        email,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
