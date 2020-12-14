import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import swal from 'sweetalert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './dashboardpage.css';
import AuthService from '../Authentication/AuthService';
const URL = process.env.REACT_APP_SERVER_URL;
class Dashboardpage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfProduct: 0,
      totalOrders: 0,
      recentOrderList: [],
      totalRevenue: 0
    }
    // this.productFetch = this.productFetch.bind(this);
    this.Auth = new AuthService();
  }

  async componentWillMount() {
    console.log('Authorization', this.Auth.loggedIn());
    var a = await this.Auth.loggedIn();
    if (a) {
      return this.props.history.replace('/Dashboard');
    } else {
      return this.props.history.replace('/');
    }
  }

  componentDidMount() {
    this.productFetch();
  }

  productFetch = async () => {
    try {
      const dashboard_data = await axios.get(`${URL}/api/vendor/dashboard/${this.props.userId}`)
      if (dashboard_data.data) {
        this.setState({
          numberOfProduct: dashboard_data.data.numberOfProduct,
          totalOrders: dashboard_data.data.totalOrders,
          totalRevenue: dashboard_data.data.totalRevenue
        }, () => {
          this.fetchRecentOrders()
        })
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  fetchRecentOrders = () => {
    axios.get(`${URL}/api/vendor/dashboard/recent-order/${this.props.userId}`)
      .then(response => {
        this.setState({
          recentOrderList: response.data.recentOrderList
        })
      })
      .catch(error => {
        console.log("Error: ", error)
      })
  }

  renderRecentOrderList = () => {
    return this.state.recentOrderList.map((order, index) => {
      let customerName = "";
      let deliveryAddress = "";
      if (Array.isArray(order.customer) && order.customer.length > 0) {
        customerName = `${order.customer[0].firstName} ${order.customer[0].lastName}`
      }

      if (Array.isArray(order.address) && order.address.length > 0) {
        deliveryAddress = `${order.address[0].address},\n${order.address[0].city},\n${order.address[0].state}`;
      }



      return (
        <tr key={index}>
          <td className="wd-15p">{order.orderItems._id}</td>
          <td className="wd-15p">{order.orderItems.orderStatus}</td>
          <td className="wd-15p">{customerName}</td>
          <td className="wd-15p">{moment(order.orderDate).format('DD/MM/YYYY')}</td>
          <td className="wd-25p">{order.orderItems.totalOrderItemAmount}</td>
          <td className="wd-15p">{deliveryAddress}</td>
          <td className="wd-20p">{order.paymentType}</td>
          <td className="wd-25p"><a href={`/orderdetail?orderId=${order.orderItems._id}`}>View</a></td>
        </tr>
      )
    })
  }

  render() {

    const { numberOfProduct, totalOrders } = this.state

    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h4 className="page-title">Dashboard</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="#">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
          </div>

          <div className="row row-cards">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-right">
                      <i className="mdi mdi-poll-box text-danger icon-size"></i>
                    </div>
                    <div className="float-left">
                      <p className="mb-0 text-left">No of Products</p>
                      <div className="">
                        <h3 className="font-weight-semibold text-left mb-0">{numberOfProduct}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted mb-0">
                    <i className="mdi mdi-arrow-up-drop-circle mr-1 text-success" aria-hidden="true"></i> Products Successful Add
                    </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-right">
                      <i className="mdi mdi-receipt text-success icon-size"></i>
                    </div>
                    <div className="float-left">
                      <p className="mb-0 text-left">Total Order</p>
                      <div className="">
                        <h3 className="font-weight-semibold text-left mb-0">{totalOrders}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted  mb-0">
                    <i className="mdi mdi-arrow-down-drop-circle mr-1 text-success" aria-hidden="true"></i>20% higher growth
                    </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-right">
                      <i className="mdi mdi-cube text-warning icon-size"></i>
                    </div>
                    <div className="float-left">
                      <p className="mb-0 text-left">Total Revenue</p>
                      <div className="">
                        <h3 className="font-weight-semibold text-left mb-0">{this.state.totalRevenue}</h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted mb-0">
                    <i className="mdi mdi-arrow-up-drop-circle text-success mr-1" aria-hidden="true"></i> 80% higher growth
                    </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Order List</h3>
                </div>
                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap">
                    <thead>
                      <tr>
                        <th className="wd-15p">Order Id</th>
                        <th className="wd-15p">Order Status</th>
                        <th className="wd-15p">User Name</th>
                        <th className="wd-20p">Date/Time</th>
                        <th className="wd-20p">Price</th>
                        <th className="wd-15p">Deliver Address</th>
                        <th className="wd-25p">Payment Status</th>
                        <th className="wd-25p">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderRecentOrderList()}
                    </tbody>
                  </table>
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
    name: state.inititateState.name,
    type: state.inititateState.type,
    userId: state.inititateState.userId,
  }
}

export default withRouter(connect(mapStateToProps)(Dashboardpage));