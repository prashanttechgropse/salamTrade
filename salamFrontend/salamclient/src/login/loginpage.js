import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import './loginpage.css';
import { userLoginAction } from '../action/user.action';

class Loginpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: { value: '', isValidate: true, message: '' },
      pass: { value: '', isValidate: true, message: '' },
      type: "User",
      userId: '',
    }
  }

  handleChangeFirstName = (event) => {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
  }

  valid = () => {
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

  loginUser = (event) => {
    event.preventDefault();
    const isValidate = this.valid();
    if (isValidate) {
      let data = {
        type: this.state.type,
        email: this.state['mail'].value,
        password: this.state['pass'].value
      }
      this.props.userLoginAction(data);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.props.history.push('/');
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
                  <h3>Please Login Here!</h3>
                  <div className="formdesign">
                    <form className="form-inline" onSubmit={this.loginUser} >
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
                            <button type="submit" className="btn btn-default">Sign In</button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="form-inline">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <Link to="Forgotpassword" className="btn btn-default">Forgot Password</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="anotherlink">
                      <p style={{ color: '#1b1111' }}>Don't Have an Account <a href="/Signup" style={{ color: '#2480fe' }}>Signup Here</a></p>
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

function mapStateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    isLoggedIn: state.inititateState.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  userLoginAction
}, dispatch)


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Loginpage));