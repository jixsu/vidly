import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
const Joi = require("@hapi/joi");

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (!errors) this.doSubmit();
  };

  validateProperty = (name, value) => {
    const errors = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const result = Joi.validate(errors, schema);

    return result.error ? result.error.details[0].message : null;
  };

  handleChange = ({ currentTarget: { name, value } }) => {
    const errors = { ...this.state.errors };
    errors[name] = this.validateProperty(name, value);
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };

  renderInputField = (name, label, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        label={label}
        name={name}
        value={data[name]}
        errors={errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelectField = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        errors={errors[name]}
        options={options}
        onChange={this.handleChange}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
