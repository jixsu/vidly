import React, { Component } from "react";
import Form from "./common/form";
import * as auth from "../services/authService";
import { getUserData } from "./../services/authService";
import { Redirect } from "react-router-dom";
const Joi = require("@hapi/joi");

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //Call server
    const { email, password } = this.state.data;
    const { state } = this.props.location;
    try {
      await auth.login(email, password);

      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getUserData()) return <Redirect to="/movies" />;

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInputField("email", "Email")}
          {this.renderInputField("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
