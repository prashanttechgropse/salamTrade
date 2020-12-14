/* global google */
/* tslint:disable:no-console */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link, withRouter } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import swal from "sweetalert";
import { bindActionCreators } from "redux";
import action from "./action/action";
import { connect } from "react-redux";
import AuthService from "./Authentication/AuthService";
import "./login.css";
const URL = process.env.REACT_APP_SERVER_URL;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: "", isValidate: true, message: "" },
      password: { value: "", isValidate: true, message: "" },
      type: "Vendor",
    };
    this.Auth = new AuthService();
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.loginVendor = this.loginVendor.bind(this);
  }

  async componentWillMount() {
    var a = await this.Auth.loggedIn();
    console.log("MMMMMMMMMMMMMMMMm", this.Auth.loggedIn());
    if (a === true) {
      this.props.history.replace("/Dashboard");
    }
  }

  handleChangeEmail(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = "";
    state[name].value = value;
    this.setState(state);
  }

  validate() {
    let state = this.state;
    if (validator.isEmpty(state.email.value)) {
      state.email.isValidate = false;
      state.email.message = "Please Fill The E-mail Address";
      this.setState(state);
      return false;
    }

    if (!validator.isEmail(state.email.value)) {
      state.email.isValidate = false;
      state.email.message = "Invalid E-mail";
      this.setState(state);
      return false;
    }

    if (validator.isEmpty(state.password.value)) {
      state.password.isValidate = false;
      state.password.message = "Please Fill the Password";
      this.setState(state);
      return false;
    }

    // if(validator.isEmpty(state.remember.value)){
    // 	state.remember.isValidate = false;
    // 	state.remember.message = "Please Select";
    // 	this.setState(state);
    // 	return false;
    // }
    return true;
  }

  loginVendor(event) {
    event.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let obj = {};
      obj.type = this.state.type;
      obj.email = this.state["email"].value;
      obj.password = this.state["password"].value;
      // obj.remember = this.state['remember'].value;
      console.log("eeeeeeeeeeeeeeee", obj);
      axios.post(URL + "/api/vendor/Login", obj).then((response) => {
        console.log("PPPPPPPPPPPPPPPPPPPPP", response);
        if (response.data.status === true) {
          if (typeof Storage !== "undefined") {
            localStorage.setItem("jwtToken", response.data.token);
            // localStorage.setItem("type",response.data.accountType);
          }
          swal({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            dangerMode: false,
            closeOnClickOutside: false,
          }).then((d) => {
            if (d) {
              return this.props.history.replace("/Dashboard");
            }
          });

          // .then(function() {
          // 	window.location.reload();
          // });

          if (response) {
            this.props.authenticate({
              type: "authenticate",
              payload: response.data,
            });
          }
        } else {
          swal("Error", `${response.data.message}`, "error").then((d) => {
            if (d) {
              return this.props.history.replace("/");
            }
          });
        }
      });
    }
  }

  render() {
    const state = this.state;
    return (
      <div className="page loginpage">
        <div className="page-single">
          <div className="container">
            <div className="row">
              <div className="col col-login mx-auto">
                <div className="text-center mb-6">
                  <a href="#">
                    <img
                      src="./images/logo/logo.png"
                      className="header-brand-img"
                      alt="Salam Trades Logo"
                    />
                  </a>
                </div>
                <form className="card" onSubmit={this.loginVendor}>
                  <div className="card-body p-6">
                    <div className="card-title text-center">Vendor Login</div>
                    <div className="form-group">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        value={state.email.value}
                        onChange={this.handleChangeEmail}
                        placeholder="Enter email"
                      />
                      <div style={{ fontSize: 13, color: "red" }}>
                        {state.email.message}
                      </div>
                    </div>
                    <div className="form-group signuptext">
                      <label className="form-label">
                        Password
                        <Link
                          to="/Forgotpassword"
                          className="float-right small"
                        >
                          forgot password
                        </Link>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={state.password.value}
                        onChange={this.handleChangeEmail}
                        placeholder="Password"
                      />
                      <div style={{ fontSize: 13, color: "red" }}>
                        {state.password.message}
                      </div>
                    </div>
                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block loginbutton"
                      >
                        Sign in
                      </button>
                    </div>
                    <div className="text-center text-muted mt-3 signuptext">
                      {" "}
                      Don't have account yet?{" "}
                      <Link to="/Register">Sign up</Link>{" "}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    // type: state.inititateState.type
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
