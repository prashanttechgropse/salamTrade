import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import action from "../action/action";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import "./profilepage.css";
import AuthService from "../Authentication/AuthService";
const URL = process.env.REACT_APP_SERVER_URL;

class Profilepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
    };
    this.Auth = new AuthService();
    this.handleChageImage = this.handleChageImage.bind(this);
    // this.handleImage = this.handleImage.bind(this)
    // this.submit = this.submit.bind(this);
  }

  handleChageImage(e) {
    var that = this;
    e.preventDefault();
    var aa = "";
    let reader = new FileReader();
    console.log("77777777777777777", e.target.files[0]);
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      aa = reader.result;
      this.setState({ file: aa });
      e.preventDefault();
      let obj = {};
      obj.type = this.props.type;
      obj.email = this.props.email;
      obj.file = this.state.file;
      console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", obj);

      axios.post(URL + "/api/vendor/imgProfile", obj).then((response) => {
        console.log("responseeeeeeeeeee", response);
        if (response.data.status === true) {
          // axios.post('http://localhost:3200/api/profilePic',formData).then((resp)=>{
          //   if(resp.data.status === true){
          //     console.log('&&&&&&&&&&&&&&&&&&&&&&&&&',resp);
          //   }
          // })
          axios.post(URL + "/api/vendor/fetchUser", obj).then((doc) => {
            // console.log('document',doc);
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
            return this.props.history.replace("/Profile");
          });
        }
      });
    };
  }

  async componentWillMount() {
    var a = await this.Auth.loggedIn();
    // console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{', await this.Auth.loggedIn())
    if (a) {
      return this.props.history.replace("/Profile");
    } else {
      return this.props.history.replace("/");
    }
  }

  // submit(event){
  //   var that = this;
  //   event.preventDefault();
  //   let obj = {};
  //   // obj.type        = this.props.type;
  //   // obj.email       = this.props.email;
  //   obj.file =       this.state.file
  //   console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP',obj)
  // }

  // handleImage(event) {
  //   this.setState({
  //     file: URL.createObjectURL(event.target.files[0])
  //   })
  // }

  render() {
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h4 className="page-title">Vendor Profile</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a
                  href="javascript:void(0)"
                  onClick={() => this.props.history.replace("Dashboard")}
                >
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Vendor Profile
              </li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-profile vendorprofile">
                <div className="card-body text-center">
                  {/* <img className="card-profile-img" src= {this.props.image} alt="img"/> */}
                  <div className="vendorprofiles">
                    <img
                      className="card-profile-img vendorimages"
                      id="profile"
                      src={
                        this.props.image === null
                          ? "images/defaultImg.png"
                          : this.props.image
                      }
                      alt=""
                    />
                    <div className="image-upload">
                      <label for="file-input">
                        <i className="fa fa-camera"></i>
                      </label>
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={this.handleChageImage}
                      />
                    </div>
                  </div>
                  <h3 className="mb-3 text-white"> {this.props.name} </h3>
                  <p className="mb-4 text-white"> {this.props.type} </p>
                  <a href="/createprofile" className="btn btn-warning btn-sm">
                    <i class="fa fa-pencil-square" aria-hidden="true"></i> Edit
                    profile
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card p-5 ">
                <div className="card-title">Company Detail</div>
                <div className="media-list">
                  <div className="media mt-1 pb-2">
                    <div className="mediaicon">
                      <i className="fa fa-home" aria-hidden="true"></i>
                    </div>
                    <div className="media-body ml-5 mt-1">
                      <h6 className="mediafont text-dark">Address</h6>{" "}
                      {this.props.streetName} {this.props.address}{" "}
                      {this.props.city} {this.props.zipCode}
                    </div>
                  </div>
                  <div className="media mt-1 pb-2">
                    <div className="mediaicon">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </div>
                    <div className="media-body ml-5 mt-1">
                      <h6 className="mediafont text-dark">Email Address</h6>
                      <span className="d-block">{this.props.email}</span>
                    </div>
                  </div>
                  <div className="media mt-1 pb-2">
                    <div className="mediaicon">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="media-body ml-5 mt-1">
                      <h6 className="mediafont text-dark">Mobile No</h6>
                      <span className="d-block">{this.props.mobile}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="card">
                  <div className="card-body">
                    <div className="card-box tilebox-one">
                      <i className="icon-layers float-right text-muted"><i className="fa fa-cubes text-primary" aria-hidden="true"></i></i>
                      <h6 className="text-drak text-uppercase mt-0">No of Orders</h6>
                      <h2 className="m-b-20">678</h2>
                      <span className="badge badge-primary"> +78% </span> <span className="text-muted">From previous period</span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="card-box tilebox-one">
                      <i className="icon-layers float-right text-muted"><i className="fa fa-bar-chart text-secondary" aria-hidden="true"></i></i>
                      <h6 className="text-drak text-uppercase mt-0">Profits</h6>
                      <h2 className="m-b-20">$ 7,908</h2>
                      <span className="badge badge-secondary"> +66% </span> <span className="text-muted">Last year</span>
                    </div>
                  </div>
                </div> */}
            </div>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className=" " id="profile-log-switch">
                    <div className="fade show active ">
                      <div className="table-responsive border ">
                        <table className="table row table-borderless w-100 m-0 ">
                          <tbody className="col-lg-6 p-0">
                            <tr>
                              <td>
                                <strong>Full Name :</strong> {this.props.name}{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Store Name :</strong>{" "}
                                {this.props.storeName}{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Address :</strong>
                                {this.props.streetName} {this.props.address}{" "}
                                {this.props.city} {this.props.zipCode}{" "}
                              </td>
                            </tr>
                          </tbody>
                          <tbody className="col-lg-6 p-0">
                            <tr>
                              <td>
                                <strong>Store Email-id :</strong>{" "}
                                {this.props.storeEmail}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Email Id :</strong> {this.props.email}{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Phone Number :</strong>{" "}
                                {this.props.mobile}{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="row mt-5 profie-img"></div>
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
  console.log("pppppppppppppppppppppp", state.inititateState);
  return {
    authenticateState: state.inititateState.authenticateState,
    name: state.inititateState.name,
    storeName: state.inititateState.storeName,
    email: state.inititateState.email,
    type: state.inititateState.type,
    image: state.inititateState.image,
    mobile: state.inititateState.mobile,
    streetName: state.inititateState.streetName,
    city: state.inititateState.city,
    address: state.inititateState.address,
    storeEmail: state.inititateState.storeEmail,
    zipCode: state.inititateState.zipCode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profilepage)
);
