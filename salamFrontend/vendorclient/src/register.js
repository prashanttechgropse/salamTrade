import React, { Component } from "react";
import ReactDOM from "react-dom";
import validator from "validator";
import axios from "axios";
import swal from "sweetalert";
import $ from "jquery";
import { Link, withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import "./register.css";
const URL = process.env.REACT_APP_SERVER_URL;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: "", isValidate: true, message: "" },
      email: { value: "", isValidate: true, message: "" },
      password: { value: "", isValidate: true, message: "" },
      type: "Vendor",
      visible: false,
      hover: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.registerVendor = this.registerVendor.bind(this);
  }

  handleChangeName(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = "";
    state[name].value = value;
    this.setState(state);
  }

  validate() {
    let state = this.state;
    if (validator.isEmpty(state.name.value)) {
      state.name.isValidate = false;
      state.name.message = "Please Fill The Name";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.email.value)) {
      state.email.isValidate = false;
      state.email.message = "Please Fill The E-mail Address";
      this.setState(state);
      return false;
    }
    if (!validator.isEmail(state.email.value)) {
      state.name.isValidate = false;
      state.name.message = "Invalid E-mail";
      this.setState(state);
      return false;
    }

    if (validator.isEmpty(state.password.value)) {
      state.password.isValidate = false;
      state.password.message = "Please Fill The Password";
      this.setState(state);
      return false;
    }
    if (
      !state.password.value.match(
        /^.*(?=.{8,15})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
      )
    ) {
      state.password.isValidate = false;
      state.password.message =
        "PassWord atleast 8 Character One Capital letter One Small letter One Special character And One Digit ";
      this.setState(state);
      return false;
    }
    return true;
  }

  componentDidMount() {
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }

  registerVendor(event) {
    event.preventDefault();
    let isValid = this.validate();

    if (isValid) {
      let obj = {};
      obj.type = this.state.type;
      obj.name = this.state["name"].value;
      obj.email = this.state["email"].value;
      obj.password = this.state["password"].value;
      // obj.remember = this.state['remember'].value;
      console.log("object", obj);

      this.setState({ visible: true });

      axios.post(URL + "/api/vendor/Signup", obj).then((response) => {
        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR", response);
        if (response.data.status === true) {
          this.setState({ visible: false });
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
          // swal("Successful",
          // `${response.data.message}`,
          // "success",
          // ).then((d)=>{
          // 	if(d){
          // 		return this.props.history.replace('/');
          // 	}
          // })
        } else {
          this.setState({ visible: false });
          swal("Error", `${response.data.message}`, "error").then((d) => {
            if (d) {
              return this.props.history.replace("/Register");
            }
          });
        }
      });
    }
  }

  handleMouseIn = () => {
    this.setState({ hover: true });
  };

  handleMouseOut = () => {
    this.setState({ hover: false });
  };

  render() {
    const state = this.state;
    const tooltipStyle = {
      display: this.state.hover ? "block" : "none",
    };
    return (
      <div className="page registerpage">
        <Loader
          visible={this.state.visible}
          type="Puff"
          className="signuploader"
        />
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
                <form className="card " onSubmit={this.registerVendor}>
                  <div className="card-body p-6">
                    <div className="card-title text-center">
                      Create New Account
                    </div>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="name"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="name"
                        value={state.name.value}
                        onChange={this.handleChangeName}
                        placeholder="Enter name"
                      />
                      <div style={{ fontSize: 13, color: "red" }}>
                        {state.name.message}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        value={state.email.value}
                        onChange={this.handleChangeName}
                        placeholder="Enter email"
                      />
                      <div style={{ fontSize: 13, color: "red" }}>
                        {state.email.message}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Password{" "}
                        <i
                          onMouseOver={this.handleMouseIn}
                          onMouseOut={this.handleMouseOut}
                          className="fa fa-info-circle"
                        >
                          {" "}
                        </i>
                      </label>
                      <div>
                        <div style={tooltipStyle} className="Tooltip--Text">
                          PassWord atleast 8 Character One Capital letter One
                          Small letter One Special character And One Digit
                        </div>
                      </div>
                      <div className="checkpassword">
                        {/* <input type="password" className="form-control"  id="exampleInputPassword1" name = "password" value = {state.password.value} onChange = {this.handleChangeName} placeholder="Password"/>
											  <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span> */}
                        <input
                          id="password-field"
                          type="password"
                          className="form-control"
                          name="password"
                          value={state.password.value}
                          onChange={this.handleChangeName}
                        />
                        <span
                          toggle="#password-field"
                          className="fa fa-fw fa-eye field-icon toggle-password"
                        ></span>
                        {/* <i className="fa fa-eye two btn-one text "></i>
											  <i className="fa fa-eye-slash one btn-two password"></i>	 */}
                        {/* <div class="one">Ram</div>
											  <div class="two">Shyam</div>
											  <button class="btn-one">one</button>
											  <button class="btn-two">two</button> */}
                      </div>

                      <div style={{ fontSize: 13, color: "red" }}>
                        {state.password.message}
                      </div>
                    </div>
                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block loginbutton"
                      >
                        Create new account
                      </button>
                    </div>
                    <div className="text-center text-muted mt-3 signuptext">
                      {" "}
                      Already have account? <Link to="/">Sign in</Link>{" "}
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
export default Register;
