const mongoose = require("mongoose");
const { dbConnect } = require("../services/DBService");
const { Schema, model } = mongoose;

const userScheme = new Schema({
  username: {
    type: String,
    required: "Username is required",
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "player",
  },
});

// const Expenses = model(month, expensesScheme, month);

class User {
  //create a constractor for user class an implement the mongoose model function for every user make it easy to save in database
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.instrument = user.instrument;
    this.role = user.role;
    this._id = user._id;

    this.Model = model("Users", userScheme);
  }

  InsertUser = async () => {
    // Check if user already exists
    await dbConnect();
    const existingUser = await this.Model.findOne({ username: this.username });

    if (existingUser) {
      return {
        code: 400,
        ok: false,
        data: [],
        message: "It seems you already have an account, please log in instead.",
      };
    }

    const user = new this.Model({
      username: this.username,
      password: this.password,
      instrument: this.instrument,
      role: this.role,
    });

    console.log("user", user);

    //insert the new user to database
    const newUser = await user.save();

    mongoose.disconnect();
    return {
      code: 201,
      ok: true,
      data: [newUser],
      message:
        "Thank you for registering with us. Your account has been successfully created.",
    };
  };

  GetUsers = async () => {
    await dbConnect();

    const users = await this.Model.find();

    mongoose.disconnect();
    return users;
  };

  LoginUser = async () => {

    await dbConnect();

    const user = await this.Model.findOne({
      username: this.username,
    });

    mongoose.disconnect();

    if (user !== null) {
      if (this.password === user.password) {
        return {
          code: 200,
          ok: true,
          data: [{ ...user._doc, password: undefined }],
          message: "You are loged in",
        };
      }

      return {
        code: 401,
        ok: false,
        data: [],
        message: "Inccoret password",
      };
    } else {
      return {
        code: 404,
        ok: false,
        data: [],
        message: "User wasn't found ",
      };
    }
  };
}

module.exports = User;
