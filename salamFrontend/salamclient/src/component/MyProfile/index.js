import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import swal from 'sweetalert';
import action from '../action/action';
import './myprofile.css';
const URL = process.env.REACT_APP_SERVER_URL;

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { value: this.props.firstName, isValidate: true, message: '' },
      lastName: { value: this.props.lastName, isValidate: true, message: '' },
      mobile: { value: this.props.mobile, isValidate: true, message: '' },
      gender: { value: this.props.gender, isValidate: true, message: '' },
      dob: { value: this.props.dob, isValidate: true, message: '' },
      streetAddress: { value: this.props.streetAddress, isValidate: true, message: '' },
      zipcode: { value: this.props.zipcode, isValidate: true, message: '' },
      city: { value: this.props.city, isValidate: true, message: '' },
      state: { value: this.props.state, isValidate: true, message: '' },
      country: { value: this.props.country, isValidate: true, message: '' }
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
  }

  handleChangeMobile(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
  }
  
  submit(event) {
    event.preventDefault();
    // let isValid = this.validate();
    // if(isValid){
    let obj = {};
    obj.type = this.props.Type;
    obj.email = this.props.email;
    obj.firstName = this.state['firstName'].value;
    obj.lastName = this.state['lastName'].value;
    obj.mobile = this.state['mobile'].value;
    obj.gender = this.state['gender'].value;
    obj.dob = this.state['dob'].value;
    obj.streetAddress = this.state['streetAddress'].value;
    obj.zipcode = this.state['zipcode'].value;
    obj.city = this.state['city'].value;
    obj.state = this.state['state'].value;
    obj.country = this.state['country'].value;
    axios.post(URL + '/api/user/userProfile', obj).then((response) => {
      if (response.data.status === true) {
        // axios.post('http://3.92.136.66:4000/api/fetchUser').then((doc)=>{
        if (response) {
          this.props.authenticate({
            type: 'authenticate',
            payload: response.data
          })
        }
        // })
        swal("Successful",
          `${response.data.message}`)
          .then((d) => {
            return window.location = '/Myprofile'
          })
      } else {
        swal("Error",
          `${response.data.message}`,
        ).then((d) => {
          return this.props.history.replace('/Myprofile')
        })
      }
    })
    // }
  }

  maxDateForDOBInput = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today
  }


  render() {
    const state = this.state;
    return (
      <section className="col-main col-sm-9  wow bounceInUp animated profile-fluid">
        <div className="category-title">
          {/* <h1>My Profile<span className="editprofile"><a href="javascript:;">Edit Profile</a></span></h1> */}
          <div className="breadcrumbs">
            <div className="row">
              <ul>
                <li className="home"> <a href="/" title="Go to Home Page">Home</a><span>/</span></li>
                <li className=""> <a href="javascript:;" title="Go to Home Page">My Account</a><span>/</span></li>
                <li className="category13"> My Profile</li>
              </ul>
            </div>
          </div>
          <div className="profileform">
            <form onSubmit={this.submit}>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="from">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={state.firstName.value} onChange={this.handleChange} placeholder="Akram" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="from">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={state.lastName.value} onChange={this.handleChange} placeholder="" />
                    {/* <div style={{ fontSize: 13, color: "red" }}>
                               {state.lastName.message}
                              </div> */}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="from">Email Id</label>
                    <input type="text" className="form-control" value={this.props.email} disabled />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="from">Mobile No.</label>
                    <input type="text" className="form-control" name="mobile" value={state.mobile.value} onChange={this.handleChange} placeholder="" />
                    {/* <div style={{ fontSize: 13, color: "red" }}>
                               {state.mobile.message}
                              </div> */}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="to">Date of Birth</label>
                    <input type="date" className="form-control" id="dateofbirth" name='dob' value={state.dob.value} onChange={this.handleChange} max={this.maxDateForDOBInput()} />
                    {/* <div style={{ fontSize: 13, color: "red" }}>
                               {state.dob.message}
                              </div> */}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="status">Gender</label>
                    <select className="form-control" name="gender" defaultValue="" value={state.gender.value} onChange={this.handleChange} >
                      <option value="" hidden>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    {/* <div style={{ fontSize: 13, color: "red" }}>
                               {state.gender.message}
                              </div> */}
                  </div>
                </div>
              </div>

            </form>

          </div>

        </div>
        <div className="category-title">
          <h1>Address Information</h1>
          <div className="profileform">
            <form onSubmit={this.submit} >
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="from">Street Address</label>
                    <input type="text" className="form-control" name="streetAddress" value={state.streetAddress.value} onChange={this.handleChange} placeholder="Enter Street" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="from">City</label>
                    <input type="text" className="form-control" placeholder="Enter city" name="city" value={state.city.value} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="from">State</label>
                    <input type="text" className="form-control" placeholder="Enter state" name="state" value={state.state.value} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="from">Zip Code</label>
                    <input type="text" className="form-control" placeholder="Enter pincode" name="zipcode" value={state.zipcode.value} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="status">Country</label>
                    <input type="text" className="form-control" placeholder="Enter country" name="country" value={state.country.value} onChange={this.handleChange} />
                  </div>
                  <button type='submit' className="btn btn-primary" style={{ marginLeft: 310 }} onClick={this.submit}  >submit</button>
                </div>
              </div>
            </form>

          </div>

        </div>
      </section>


    )
  }
}

function mapStateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    email: state.inititateState.email,
    Type: state.inititateState.Type,
    firstName: state.inititateState.firstName,
    lastName: state.inititateState.lastName,
    gender: state.inititateState.gender,
    dob: state.inititateState.dob,
    mobile: state.inititateState.mobile,
    streetAddress: state.inititateState.streetAddress,
    zipcode: state.inititateState.zipcode,
    city: state.inititateState.city,
    state: state.inititateState.state,
    country: state.inititateState.country
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyProfile));