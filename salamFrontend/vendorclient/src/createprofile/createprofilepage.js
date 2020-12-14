/* global google */
/* tslint:disable:no-console */

import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import validator from "validator";
import axios from "axios";
import swal from "sweetalert";
import $ from "jquery";
import "./createprofilepage.css";
import { access, read } from "fs";
import action from "../action/action";
import AuthService from "../Authentication/AuthService";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Map from "./map";
import { classnames } from "../helpers";
import { toast } from "react-toastify";
import "../common/plugins/forn-wizard/css/material-bootstrap-wizard.css";

toast.configure();

const URL = process.env.REACT_APP_SERVER_URL;

class Createprofilepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { value: this.props.name, isValidate: true, message: "" },
      mobile: { value: this.props.mobile, isValidate: true, message: "" },
      storeName: { value: this.props.storeName, isValidate: true, message: "" },
      storeEmail: {
        value: this.props.storeEmail,
        isValidate: true,
        message: "",
      },
      storeMobile: {
        value: this.props.storeMobile,
        isValidate: true,
        message: "",
      },
      streetName: {
        value: this.props.streetName,
        isValidate: true,
        message: "",
      },
      zipCode: { value: this.props.zipCode, isValidate: true, message: "" },
      city: { value: this.props.city, isValidate: true, message: "" },
      cState: { value: this.props.cState, isValidate: true, message: "" },
      file: this.props.image,
      // file        : null,
      address: this.props.address,
      errorMessage: "",
      latitude: null,
      longitude: null,
      isGeocoding: false,
      currentActiveTab: 0,
    };
    this.handleChage = this.handleChage.bind(this);
    this.finish = this.finish.bind(this);
    this.handleChageImage = this.handleChageImage.bind(this);
    this.Auth = new AuthService();
  }

  handleChageImage(e) {
    e.preventDefault();
    var aa = "";
    let reader = new FileReader();
    console.log("77777777777777777", e.target.files[0]);
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      aa = reader.result;
      this.setState({ file: aa });
    };
  }

  handleChage(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = "";
    state[name].value = value;
    this.setState(state);
  }

  async componentWillMount() {
    var a = await this.Auth.loggedIn();
    if (a) {
      return this.props.history.replace("/Createprofile");
    } else {
      return this.props.history.replace("/");
    }
  }

  /**
   * When a suggest got selected
   */

  handleChangemap = (address) => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: "",
    });
  };

  handleSelect = (selected) => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then((res) => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch((error) => {
        this.setState({ isGeocoding: false });
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  finish(event) {
    var that = this;
    event.preventDefault();
    let obj = {};
    obj.type = that.props.type;
    obj.email = that.props.email;
    obj.name = that.state["name"].value;
    obj.mobile = that.state["mobile"].value;
    obj.storeName = that.state["storeName"].value;
    obj.storeEmail = that.state["storeEmail"].value;
    obj.storeMobile = that.state["storeMobile"].value;
    obj.streetName = that.state["streetName"].value;
    obj.address = that.state.address;
    obj.zipCode = that.state["zipCode"].value;
    obj.city = that.state["city"].value;
    obj.state = that.state["cState"].value;
    obj.file = that.state.file;
    obj.latLng = "";

    axios.post(URL + "/api/vendor/clientProfile", obj).then((response) => {
      console.log("responseeeeeeeeeee", response);
      if (response.data.status === true) {
        // axios.post('http://localhost:3200/api/profilePic',formData).then((resp)=>{
        //   if(resp.data.status === true){
        //     console.log('&&&&&&&&&&&&&&&&&&&&&&&&&',resp);
        //   }
        // })
        axios.post(URL + "/api/vendor/fetchUser", obj).then((doc) => {
          console.log("document", doc);
          if (doc) {
            that.props.authenticate({
              type: "authenticate",
              payload: doc.data,
            });
          }
        });
        swal("Successful", `${response.data.message}`).then((d) => {
          return this.props.history.replace("/Profile");
        });
      } else {
        swal("Error", `${response.data.message}`).then((d) => {
          return this.props.history.replace("/Createprofile");
        });
      }
    });
  }

  //   editBasicInfo() {
  //     $(".basic").prop('disabled', true);
  //     $(".basic").prop('disabled', false);
  // }
  notify = () => toast("Wow so easy !");

  changeTab = (tab) => {
    console.log("--------------", tab);
    this.setState({ currentActiveTab: tab });
  };

  render() {
    const state = this.state;
    console.log("this.address", this.state.address);

    const {
      currentActiveTab,
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
    } = this.state;

    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <div>
              <button onClick={this.notify}>Notify !</button>
            </div>
            <h4 className="page-title">Edit Profile</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/Dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Profile
              </li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    Hi Vendor Please Complete Your Profile{" "}
                  </div>
                </div>
                <div className="card-body p-6">
                  <div className="wizard-container">
                    <div className="wizard-card m-0" id="wizardProfile">
                      <div className="wizard-navigation">
                        <ul className="nav nav-pills">
                          <li
                            className={`${
                              currentActiveTab == 0 ? "active" : ""
                            }`}
                          >
                            <a href="#about" onClick={() => this.changeTab(0)}>
                              About Vendor
                            </a>
                          </li>
                          <li
                            className={`${
                              currentActiveTab == 1 ? "active" : ""
                            }`}
                          >
                            <a
                              href="#business"
                              onClick={() => this.changeTab(1)}
                              data-toggle="tab"
                            >
                              About Business
                            </a>
                          </li>
                          <li
                            className={`${
                              currentActiveTab == 2 ? "active" : ""
                            }`}
                          >
                            <a
                              href="#address"
                              onClick={() => this.changeTab(2)}
                            >
                              Your Address
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="headline">
                            <h3><button style={{ float: 'right' }}><span> <i className="fa fa-edit"  onClick={() => this.editBasicInfo()}></i></span></button></h3>
                          </div> */}
                      <form>
                        <div className="tab-content">
                          <div
                            className={`${
                              currentActiveTab == 0 ? "active" : "tab-pane"
                            }`}
                            id="about"
                          >
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="input-group">
                                  <div className="form-group label-floating">
                                    <label className="control-label">
                                      Your Name{" "}
                                    </label>
                                    <input
                                      name="name"
                                      type="text"
                                      className="form-control basic"
                                      value={state.name.value}
                                      onChange={this.handleChage}
                                      placeholder="Audu Maikori"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input-group">
                                  <div className="form-group label-floating">
                                    <label className="control-label">
                                      Your Email{" "}
                                    </label>
                                    <input
                                      type="text"
                                      value={this.props.email}
                                      className="form-control"
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input-group">
                                  <div className="form-group label-floating">
                                    <label className="control-label">
                                      Contact Number{" "}
                                    </label>
                                    <input
                                      name="mobile"
                                      className="form-control basic"
                                      value={state.mobile.value}
                                      onChange={this.handleChage}
                                      type="text"
                                      placeholder=""
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="col-sm-12">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label uploadprofile">Upload profile Image </label>
                                      <div className="custom-file">
                                        <input type="file"  name = "myImage" id = "file" accept="image/*" onChange = {this.handleChageImage}   className="custom-file-input basic"  />
                                        <label className="custom-file-label basic">Choose file</label>
                                      </div>
                                     </div>
                                   </div>
                                </div> */}
                            </div>
                          </div>
                          <div
                            className={`${
                              currentActiveTab == 1 ? "active" : "tab-pane"
                            }`}
                            id="business"
                          >
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="input-group">
                                  <div className="form-group label-floating">
                                    <label className="control-label">
                                      Store Name{" "}
                                    </label>
                                    <input
                                      name="storeName"
                                      type="text"
                                      value={state.storeName.value}
                                      onChange={this.handleChage}
                                      className="form-control basic"
                                      placeholder="Audu Maikori"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input-group">
                                  <div className="form-group label-floating">
                                    <label className="control-label">
                                      Store Email-id{" "}
                                    </label>
                                    <input
                                      name="storeEmail"
                                      value={state.storeEmail.value}
                                      onChange={this.handleChage}
                                      type="email"
                                      className="form-control basic"
                                      placeholder="audu@gmail.com"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input-group">
                                  <div className="form-group label-floating">
                                    <label className="control-label">
                                      Store Contact Number{" "}
                                    </label>
                                    <input
                                      name="storeMobile"
                                      value={state.storeMobile.value}
                                      onChange={this.handleChage}
                                      type="text"
                                      className="form-control basic"
                                      placeholder=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${
                              currentActiveTab == 2 ? "active" : "tab-pane"
                            }`}
                            id="address"
                          >
                            <div className="row">
                              <div className="col-sm-4">
                                <div className="form-group label-floating">
                                  <label className="control-label">
                                    Street Name
                                  </label>
                                  <input
                                    type="text"
                                    name="streetName"
                                    value={state.streetName.value}
                                    onChange={this.handleChage}
                                    className="form-control basic"
                                  />
                                </div>
                              </div>

                              <div className="col-sm-4">
                                <div className="form-group label-floating">
                                  <label className="control-label">
                                    Zip Code
                                  </label>
                                  <input
                                    type="text"
                                    name="zipCode"
                                    value={state.zipCode.value}
                                    onChange={this.handleChage}
                                    className="form-control basic"
                                  />
                                </div>
                              </div>
                              <div className="col-sm-4 ">
                                <div className="form-group label-floating">
                                  <label className="control-label">City</label>
                                  <input
                                    type="text"
                                    name="city"
                                    value={state.city.value}
                                    onChange={this.handleChage}
                                    className="form-control basic"
                                  />
                                </div>
                              </div>
                              <div className="col-sm-4 ">
                                <div className="form-group label-floating">
                                  <label className="control-label">State</label>
                                  <input
                                    type="text"
                                    name="cState"
                                    value={state.cState.value}
                                    onChange={this.handleChage}
                                    className="form-control basic"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="wizard-footer">
                          <div className="pull-right">
                            {currentActiveTab === 0 ||
                            currentActiveTab === 1 ? (
                              <input
                                type="button"
                                className="btn btn-next btn-fill btn-primary btn-wd m-0"
                                name="next"
                                value="Next"
                                onClick={() =>
                                  this.changeTab(currentActiveTab + 1)
                                }
                              />
                            ) : (
                              <input
                                type="button"
                                className="btn btn-finish btn-fill btn-success btn-wd m-0"
                                style={{ display: "block" }}
                                value="Submit"
                                onClick={this.finish}
                              />
                            )}
                          </div>
                          <div className="pull-left">
                            {currentActiveTab != 0 && (
                              <input
                                type="button"
                                className="btn btn-previous btn-fill btn-default btn-wd m-0"
                                name="previous"
                                value="Previous"
                                onClick={() =>
                                  this.changeTab(currentActiveTab - 1)
                                }
                              />
                            )}
                          </div>
                          <div className="clearfix"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('pppppppppppppppppppppp',state.inititateState.image);
  return {
    authenticateState: state.inititateState.authenticateState,
    image: state.inititateState.image,
    email: state.inititateState.email,
    type: state.inititateState.type,
    name: state.inititateState.name,
    mobile: state.inititateState.mobile,
    storeName: state.inititateState.storeName,
    storeEmail: state.inititateState.storeEmail,
    storeMobile: state.inititateState.storeMobile,
    streetName: state.inititateState.streetName,
    address: state.inititateState.address,
    zipCode: state.inititateState.zipCode,
    city: state.inititateState.city,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Createprofilepage)
);
