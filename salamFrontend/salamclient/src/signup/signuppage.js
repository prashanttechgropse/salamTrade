import React from 'react';
import './signuppage.css';
import validator from 'validator';
import axios from 'axios';
import swal from 'sweetalert';
const URL = process.env.REACT_APP_SERVER_URL;

class Signuppage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: '', isValidate: true, message: '' },
      lastName: { value: '', isValidate: true, message: '' },
      email: { value: '', isValidate: true, message: '' },
      mobile: { value: '', isValidate: true, message: '' },
      password: { value: '', isValidate: true, message: '' },
      cpassword: { value: '', isValidate: true, message: '' },
      type: "User",
    }
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleChangeFirstName(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
  }

  validate() {
    let state = this.state;
    if (validator.isEmpty(state.firstName.value)) {
      state.firstName.isValidate = false;
      state.firstName.message = 'First Name Required';
      this.setState(state);
      return false;
    }

    if (validator.isEmpty(state.lastName.value)) {
      state.lastName.isValidate = false;
      state.lastName.message = 'Please Fill The Last Name';
      this.setState(state);
      return false;
    }

    if (validator.isEmpty(state.email.value)) {
      state.email.isValidate = false;
      state.email.message = 'Please Fill The E-mail';
      this.setState(state);
      return false;
    }

    if (!validator.isEmail(state.email.value)) {
      state.email.isValidate = false;
      state.email.message = 'Invalid E-mail';
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.mobile.value)) {
      state.mobile.isValidate = false;
      state.mobile.message = 'Please Fill The Mobile';
      this.setState(state);
      return false;
    }
    if (!validator.isNumeric(state.mobile.value)) {
      state.mobile.isValidate = false;
      state.mobile.message = 'Must be Number';
      this.setState(state);
      return false;
    }

    if (validator.isEmpty(state.password.value)) {
      state.password.isValidate = false;
      state.password.message = 'Please Fill The Password';
      this.setState(state);
      return false;
    }

    if (validator.isEmpty(state.cpassword.value)) {
      state.cpassword.isValidate = false;
      state.cpassword.message = 'Please Fill The Confirm Password';
      this.setState(state);
      return false;
    }

    if (!validator.equals(state.password.value, state.cpassword.value)) {
      state.cpassword.value = false;
      state.cpassword.message = "Password and ConfirmPassword Not Match";
      this.setState(state);
      return false;
    }
    return true;
  }

  registerUser(event) {
    event.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let obj = {}
      obj.type = this.state.type;
      obj.firstName = this.state['firstName'].value;
      obj.lastName = this.state['lastName'].value;
      obj.email = this.state['email'].value;
      obj.mobile = this.state['mobile'].value;
      obj.password = this.state['password'].value;
      obj.cpassword = this.state['cpassword'].value;

      axios.post(URL + '/api/user/Signup', obj).then((response) => {
        if (response.data.status === true) {
          swal({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            dangerMode: false,
            closeOnClickOutside: false,
          }).then((d) => {
            if (d) {
              window.location = '/Login';
            }
          })

        } else {
          swal("Error",
            `${response.data.message}`,
            "error",
          ).then((d) => {
          })
        }
      })
    }
  }

  render() {
    const state = this.state;
    return (
      <div className="main-container col2-right-layout myorder-fluid">
        <div className="container">
          <div className="loginformdesign">
            <div className="loginsignup">
              <div className="signupform">
                <div className="heafingpoint">
                  <h3>New user Create Account!</h3>
                  <div className="formdesign">
                    <form className="form-inline" autocomplete="off" onSubmit={this.registerUser} >
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input type="text" className="form-control" name="firstName"
                              value={state.firstName.value} onChange={this.handleChangeFirstName}
                              placeholder="First Name" />
                            <div style={{ fontSize: 13, color: "red" }} >{state.firstName.message} </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input type="text" className="form-control" name="lastName"
                              value={state.lastName.value} onChange={this.handleChangeFirstName}
                              placeholder="Last Name" />
                            <div style={{ fontSize: 13, color: "red" }}>
                              {state.lastName.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input type="email" className="form-control" name="email"
                              value={state.email.value} onChange={this.handleChangeFirstName}
                              placeholder="Email Address" autocomplete="new-email" />
                            <div style={{ fontSize: 13, color: "red" }}>
                              {state.email.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input type="text" className="form-control" name="mobile"
                              value={state.mobile.value} onChange={this.handleChangeFirstName}
                              placeholder="Mobile No." />
                            <div style={{ fontSize: 13, color: "red" }}>
                              {state.mobile.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input type="password" className="form-control" name="password"
                              value={state.password.value} onChange={this.handleChangeFirstName}
                              placeholder="Password" autocomplete="new-password" />
                            <div style={{ fontSize: 13, color: "red" }}>
                              {state.password.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input type="password" className="form-control" name="cpassword"
                              value={state.cpassword.value} onChange={this.handleChangeFirstName}
                              placeholder="Confirm Password" />
                            <div style={{ fontSize: 13, color: "red" }}>
                              {state.cpassword.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <button type="submit" className="btn btn-default">Submit</button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="anotherlink">
                      <p style={{ color: '#1b1111' }}>Already Have an Account <a href="/Login" style={{ color: '#2480fe' }}>Login Here</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    )
  }
}

export default Signuppage;