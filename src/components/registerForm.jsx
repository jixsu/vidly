import React, { Component } from "react";
import Form from "./common/form";
import * as userService from "../services/userService";
import * as auth from "../services/authService";
const Joi = require("@hapi/joi");

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).max(30).required().label("Password"),
  };

  doSubmit = async () => {
    //Call server
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("name", "Name")}
          {this.renderInputField("email", "Email")}
          {this.renderInputField("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
