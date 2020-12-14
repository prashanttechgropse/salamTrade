import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './userdetailpage.css';
import axios from 'axios';
import moment from 'moment';
const URL = process.env.REACT_APP_SERVER_URL;

const Userdetailpage = (props) => {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    axios.get(`${URL}/api/admin/userdetail/${props.match.params.id}`)
      .then(response => {
        setUserData(response.data.userDetail || {});
        setOrders(response.data.orders || []);
      })
      .catch(error => {

      })
  }, [])


  const renderUserInfo = () => {
    if (userData) {
      return (
        <table className="table row table-borderless w-100 m-0 ">
          <tbody className="col-lg-6 p-0">
            <tr>
              <td><strong>Full Name :</strong>{userData.firstName || ''} {userData.lastName || ''}</td>
            </tr>
            <tr>
              <td><strong>Location :</strong> {userData.country || ''} </td>
            </tr>
            <tr>
              <td><strong>Address :</strong> {userData.streetAddress || ''} {userData.state}</td>
            </tr>
          </tbody>
          <tbody className="col-lg-6 p-0">
            <tr>
              <td><strong>Gender :</strong> {userData.gender || ''}</td>
            </tr>
            <tr>
              <td><strong>Email Id :</strong> {userData.email || ''}</td>
            </tr>
            <tr>
              <td><strong>Phone Number :</strong> {userData.mobile} </td>
            </tr>
          </tbody>
        </table>);
    }
    return null
  }

  const renderOrdersList = () => {
    let orderList = [];

    orders.map(singleOrder => {
      const vendor = singleOrder.vendor[0] || {};
      const address = singleOrder.address[0] || {};

      orderList.push(
        < tr >
          <td>{singleOrder.orderItems._id}</td>
          <td>{vendor.name}</td>
          <td>{moment(singleOrder.orderItems.createdAt).format('DD-DD-YYYY HH:MM')}</td>
          <td>{singleOrder.orderItems.totalOrderItemAmount}</td>
          <td>{address.city || ''} {address.state || ''}</td>
          <td>{singleOrder.paymentType || ''}</td>
          <td>{singleOrder.orderItems.orderStatus}</td>
          <td>
            <div className="actiontrans">
              <Link to={`/orderdetail/${singleOrder.orderItems._id}`}>View Detail</Link>
            </div>
          </td>
        </tr >)
    })
    return orderList;

  }
  return (
    <div className="my-3 my-md-5">
      <div className="container">
        <div className="page-header">
          <h4 className="page-title">User Detail</h4>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">User Detail</li>
          </ol>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-profile vendorprofile">
              <div className="card-body text-center">
                <img className="card-profile-img" src={`${window.location.origin}/images/defaultImg.png`} alt="img" />
                <h3 className="mb-3">{userData.firstName || ''} {userData.lastName || ''}</h3>
                <p className="mb-4 ">User</p>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className=" " id="profile-log-switch">
                  <div className="fade show active " >
                    <div className="table-responsive border ">
                      {renderUserInfo()}
                    </div>
                    {/* <div className="row mt-5 profie-img">
                      <div className="col-md-12">
                        <div className="media-heading">
                          <h5><strong>About John Smith</strong></h5>
                        </div>
                        <p>
                          Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus</p>
                        <p >because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">User Order List</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table id="example" className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="wd-15p">Order Id</th>
                        <th className="wd-15p">Vendor Name</th>
                        <th className="wd-20p">Date/Time</th>
                        <th className="wd-20p">Price</th>
                        <th className="wd-15p">Deliver Address</th>
                        <th className="wd-10p">Payment Status</th>
                        <th className="wd-25p">Order Status</th>
                        <th className="wd-25p">Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      {renderOrdersList()}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>)

}

export default withRouter(Userdetailpage);