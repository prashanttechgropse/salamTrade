import React from 'react';
import './loginsignup.css';
import validator from 'validator';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import { bindActionCreators } from 'redux';
import action from '../../action/action';
import { connect } from 'react-redux';
import $ from 'jquery';
const URL = process.env.REACT_APP_SERVER_URL;


class Loginsignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: '', isValidate: true, message: '' },
      lastName: { value: '', isValidate: true, message: '' },
      email: { value: '', isValidate: true, message: '' },
      password: { value: '', isValidate: true, message: '' },
      cpassword: { value: '', isValidate: true, message: '' },
      mail: { value: '', isValidate: true, message: '' },
      pass: { value: '', isValidate: true, message: '' },
      Email: { value: '', isValidate: true, message: '' },
      type: "User",
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.forgetPassword = this.forgetPassword.bind(this);
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

  valid() {
    let state = this.state;

    if (validator.isEmpty(state.mail.value)) {
      state.mail.isValidate = false;
      state.mail.message = 'Please Fill The E-mail';
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.pass.value)) {
      state.pass.isValidate = false;
      state.pass.message = 'Please Fill The Password';
      this.setState(state);
      return false;
    }
    return true;
  }

  validEmail() {
    let state = this.state;

    if (validator.isEmpty(state.Email.value)) {
      state.Email.isValidate = false;
      state.Email.message = "Please Fill The Email Address";
      this.setState(state);
      return false;
    }
    return true;
  }

  componentDidMount() {
    $('.btn-two').on('click', function () {
      $('.two').show();
      $('.one').hide();
    });

    $('.btn-one').on('click', function () {
      $('.one').show();
      $('.two').hide();
    });
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
      obj.password = this.state['password'].value;
      obj.cpassword = this.state['cpassword'].value;

      axios.post(URL + '/api/Signup', obj).then((response) => {
        if (response.data.status === true) {
          swal("Successful",
            `${response.data.message}`,
            "success",
          ).then((d) => {

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

  loginUser(event) {
    event.preventDefault();
    const isValidate = this.valid();
    if (isValidate) {
      let obj = {}
      obj.type = this.state.type;
      obj.email = this.state['mail'].value;
      obj.password = this.state['pass'].value;
      axios.post(URL + '/api/Login', obj).then((response) => {
        if (response.data.status === true) {
          swal("Successful",
            `${response.data.message}`,
            "success",
          ).then((d) => {
            if (d) {
              return window.location = "/"
            }
          })
          if (response) {
            this.props.authenticate({
              type: 'authenticate',
              payload: response.data
            })
          }
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

  forgetPassword(event) {
    event.preventDefault();
    let isValid = this.validEmail();
    if (isValid) {
      var obj = {};
      obj.email = this.state['Email'].value;

      axios.post(URL + '/api/user/forgetPasswprd', obj).then((response) => {
        if (response.data.status === true) {
          swal("Successful",
            `${response.data.message}`,
            "success",
          ).then((d) => {
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

      <div className="modal fade signupmodal" id="signuplogin" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-6">
                  <div className="loginsignup ">
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="/Signup" aria-controls="Signup" role="tab" data-toggle="tab">Signup</a></li>
                      <li role="presentation"><a href="#Login" aria-controls="/Login" role="tab" data-toggle="tab">Login</a></li>
                    </ul>
                    <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="Signup">
                        <div className="signupform">
                          <div className="heafingpoint">
                            <h3>New user Create Account!</h3>
                            <div className="formdesign">
                              <form className="form-inline"
                                onSubmit={this.registerUser}
                              >
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <input type="text" className="form-control" name="firstName"
                                        value={state.firstName.value} onChange={this.handleChangeFirstName}
                                        placeholder="First Name" />
                                      <label >{state.firstName.message} </label>
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
                                        placeholder="Email Address" />
                                      <div style={{ fontSize: 13, color: "red" }}>
                                        {state.email.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <input type="password" className="form-control" name="password"
                                        value={state.password.value} onChange={this.handleChangeFirstName}
                                        placeholder="Password" />
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="Login">
                        <div className="signupform one">
                          <div className="heafingpoint">
                            <h3>Welcome Back!</h3>
                            <div className="formdesign">
                              <form className="form-inline" onSubmit={this.loginUser}>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <input type="email" name="mail" value={state.mail.value} onChange={this.handleChangeFirstName} className="form-control" placeholder="Email Address" />
                                      <div style={{ fontSize: 13, color: "red" }}>
                                        {state.mail.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <input type="password" className="form-control" name="pass" value={state.pass.value} onChange={this.handleChangeFirstName} placeholder="Password" />
                                      <div style={{ fontSize: 13, color: "red" }}>
                                        {state.pass.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <button type="submit" className="btn btn-default ">Login</button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                              <div className="forgompass">
                                <a className="btn-two" href="javascript:;">Forgot Password?</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="Forget two">
                          <div className="heafingpoint">
                            <div className="formdesign">
                              <a className="arrow btn-one" href="javascript:;"> <i className="fa fa-arrow-left"></i> </a>
                              <form className="form-inline my-arrow" onSubmit={this.forgetPassword} >
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      <input type="email" name="Email" value={state.Email.value} onChange={this.handleChangeFirstName} className="form-control" placeholder="Email Address" />
                                      <div style={{ fontSize: 13, color: "red" }}>
                                        {state.Email.message}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-12">
                                    <div className="form-group sec">
                                      <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                </div>
                <div className="col-sm-6">
                  <div className="rightpart">
                    <h3>Shop with Confidance</h3>
                    <p>There are many  variation of passages of loriwum ipsum available but the majority</p>

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

function mapStateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    // type: state.inititateState.type
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Loginsignup));