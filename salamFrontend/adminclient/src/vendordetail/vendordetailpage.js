import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';
import './vendordetailpage.css';
import axios from 'axios';
import action from '../action/action';
import swal from 'sweetalert';
import Switch from "react-switch";
import Loader from 'react-loader-spinner'
const URL = process.env.REACT_APP_SERVER_URL;

class Vendordetailpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: { value: this.props.adminStatus, isValidate: true, message: '' },
      visible: false,
      featured: false,
      adminStatus: 'Unverify',
      vendorDetail: {},
      vendorId: undefined
    }
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);
    this.fetchFeatured = this.fetchFeatured.bind(this);
  }

  handleChangeStatus(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;

    if (name == 'status')
      state['adminStatus'] = value;
    this.setState(state);
  }
  componentDidMount() {
    const vendorId = this.getUrlParameter('vendorId');
    if (vendorId) {
      this.setState({
        vendorId
      }, () => this.fetchFeatured())
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.adminStatus != undefined) {
      console.log("-------------------", nextProps.adminStatus)
      this.setState({ adminStatus: nextProps.adminStatus })
    }
  }
  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
  
  fetchFeatured() {
    let obj = {};
    this.setState({ visible: true });
    obj.vendorId = this.state.vendorId;
    axios.post(URL + '/api/admin/fetchVendorList', obj).then((doc) => {
      this.setState({ visible: false, vendorDetail: doc.data, adminStatus: doc.data.adminStatus, featured: doc.data.featured })
    })
  }

  handleChangeButton(featured) {
    var that = this;
    this.setState({ featured });
    let obj = {};
    obj.vendorId = this.state.vendorId;
    console.log('this.state.featured', this.state.featured);
    obj.featured = (this.state.featured === false || this.state.featured === "false") ? true : false;
    console.log('handlechange', obj);

    axios.post(URL + '/api/admin/editVendorList', obj, featured).then((response) => {
      console.log('responseeeeeeeeeee', response);
      if (response.data.status === true) {
        // axios.post(URL+'/api/admin/fetchVendorList',obj).then((doc)=>{
        //   console.log('document',doc);
        // })
        swal("Successful",
          `${response.data.message}`,
        ).then((d) => {
          this.fetchFeatured()
          // return this.props.history.push("/Vendordetail");
        })
      } else {
        swal("Error",
          `${response.data.message}`,
        ).then((d) => {
          this.fetchFeatured()
          // return this.props.history.replace("/Vendordetail")
        })
      }
    })

  }


  submit(event) {
    var that = this;
    event.preventDefault();
    let obj = {};
    obj.vendorId = this.state.vendorId;
    obj.status = this.state['status'].value;

    axios.post(URL + '/api/admin/editVendorList', obj).then((response) => {
      console.log('responseeeeeeeeeee', response);
      if (response.data.status === true) {
        axios.post(URL + '/api/admin/fetchVendorList', obj).then((doc) => {
          console.log('document', doc);
          if (doc) {
            that.props.authenticate({
              type: 'authenticate',
              payload: doc.data
            })
          }
        })
        swal("Successful",
          `${response.data.message}`,
        ).then((d) => {
          // return window.location = "/Vendordetail"
        })
      } else {
        swal("Error",
          `${response.data.message}`,
        ).then((d) => {
          return this.props.history.replace("/Vendordetail")
        })
      }
    })
    // window.location = '/Vendordetail';
  }



  render() {
    const { vendorDetail } = this.state;
    console.log('-------------', this.state.adminStatus);

    return (
      <div className="my-3 my-md-5">
        <Loader visible={this.state.visible} type="Puff" className="signuploader" />
        <div className="container">
          <div className="page-header">
            <h4 className="page-title">Vendor Detail</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Vendor Detail</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-profile vendorprofile">
                <div className="card-body text-center">
                  <img className="card-profile-img" src={vendorDetail.image === null || vendorDetail.image === undefined ? "images/defaultImg.png" : vendorDetail.image} alt="img" />
                  <h3 className="mb-3 text-white">{vendorDetail.name}</h3>
                  <p className="mb-4 text-white">{vendorDetail.accountType}</p>
                  {/* <a href="/createprofile" className="btn btn-warning btn-sm"><i className="fa fa-pencil"></i> Edit profile</a> */}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card p-5 ">
                <div className="card-title">
                  Vendor Detail
                  </div>
                <div className="media-list">
                  <div className="media mt-1 pb-2">
                    <div className="mediaicon">
                      <i className="fa fa-home" aria-hidden="true"></i>
                    </div>
                    <div className="media-body ml-5 mt-1">
                      <h6 className="mediafont text-dark">Address</h6> {vendorDetail.streetName} {vendorDetail.city} {vendorDetail.address}
                    </div>
                  </div>
                  <div className="media mt-1 pb-2">
                    <div className="mediaicon">
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </div>
                    <div className="media-body ml-5 mt-1">
                      <h6 className="mediafont text-dark">Email Address</h6><span className="d-block">{vendorDetail.email}</span>
                    </div>
                  </div>
                  <div className="media mt-1 pb-2">
                    <div className="mediaicon">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="media-body ml-5 mt-1">
                      <h6 className="mediafont text-dark">Mobile No</h6><span className="d-block">{vendorDetail.mobile}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className=" " id="profile-log-switch">
                    <div className="fade show active " >
                      <div className="table-responsive border ">

                        <label>
                          <span>Favourite</span>
                          <Switch checked={this.state.featured === false ? false : this.state.featured} onChange={this.handleChangeButton} />
                        </label>
                        <table className="table row table-borderless w-100 m-0 ">
                          <tbody className="col-lg-6 p-0">
                            <tr>
                              <td><strong>Full Name :</strong> {vendorDetail.name} </td>
                            </tr>
                            <tr>
                              <td><strong>StoreName :</strong> {vendorDetail.storeName}</td>
                            </tr>
                            <tr>
                              <td><strong>Address :</strong> {vendorDetail.streetName} {vendorDetail.city} {vendorDetail.address}</td>
                            </tr>
                            <tr>
                              <td>
                                <select className="form-control custom-select" name="status" value={this.state.adminStatus} onChange={this.handleChangeStatus}>
                                  {/* <option value = '' ></option> */}
                                  <option>Unverify</option>
                                  <option>Verify</option>
                                  <option>Block</option>
                                  {/* <option>UnBlock</option> */}
                                </select>
                              </td>
                            </tr>
                          </tbody>
                          <tbody className="col-lg-6 p-0">
                            <tr>
                              <td><strong> Store Email-id :</strong> {vendorDetail.storeEmail}</td>
                            </tr>
                            <tr>
                              <td><strong>Email Id :</strong> {vendorDetail.email} </td>
                            </tr>
                            <tr>
                              <td><strong>Phone Number :</strong> {vendorDetail.mobile} </td>
                            </tr>
                            <tr>
                              <td><button type="button" className="btn btn-primary" style={{ marginTop: '15Px' }} onClick={this.submit}>Submit</button> </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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
  console.log('state', state.inititateState);
  return {
    authenticateState: state.inititateState.authenticateState,
    email: state.inititateState.email,
    accountType: state.inititateState.accountType,
    vendorId: state.inititateState.vendorId,
    name: state.inititateState.name,
    mobile: state.inititateState.mobile,
    image: state.inititateState.image,
    vendorId: state.inititateState.vendorId,
    adminStatus: state.inititateState.adminStatus,
    address: state.inititateState.address,
    city: state.inititateState.city,
    streetName: state.inititateState.streetName,
    storeEmail: state.inititateState.storeEmail,
    storeName: state.inititateState.storeName,
    // featured :  state.inititateState.featured,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vendordetailpage));