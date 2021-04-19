import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import Service from "../services/services";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = value => {
  if (value.length < 3) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be at least 3 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 8) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be at least 8.
      </div>
    );
  }
};



export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      successful: false,
      match: true,
      message: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  async onChangePassword2(e) {
    const body = {};
    body.password2 = e.target.value;
    if (e.target.value === this.state.password) {
      body.match = true;
    }
    else {
      body.match = false;
    }
    await this.setState(body);
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0 && this.state.match) {
      Service.registerDriver(
        this.state.name,
        this.state.email,
        this.state.password
      ).then(
        () => {
          this.setState({
            message: "Success. Reloading in 3 seconds",
            successful: true
          });
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        },
        error => {
          const resMessage = error.response.data.email || error.response.data.password ||
            error.response.data.password2 || error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <h3>Sign Up</h3>
          <Form
            onSubmit={this.handleRegister}
            ref={form => this.form = form}
          >

            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="passwordConfirm"
                  value={this.state.password2}
                  onChange={this.onChangePassword2}
                  validations={[required]}
                />
              </div>

              {!this.state.match && (
                <div className="alert alert-danger" role="alert">
                  Passwords do not match.
                </div>
              )}


              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
