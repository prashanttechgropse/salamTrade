import React from 'react';
import ReactDOM from 'react-dom';
import './orderlistpage.css';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./datatable.css";

import action from '../action/action';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';
import AuthService from '../Authentication/AuthService';
const URL = process.env.REACT_APP_SERVER_URL;



class Orderlistpage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      myOrders: [],
      rowdata: [],
      body: [],
    }
    this.Auth = new AuthService();
  }

  async componentWillMount() {


    var a = await this.Auth.loggedIn()

    if (a) {
      // return this.props.history.replace('/Profile');
    } else {
      return this.props.history.replace('/');
    };
    this.fetchMyOrder();
  }
  fetchMyOrder() {

    if (this.props.userId) {
      axios.post(URL + '/api/vendor/getAllOrder', {
        vendorId: this.props.userId
      }).then((response) => {
        if(Array.isArray(response.data.myOrders))
        this.setState({
          myOrders: response.data.myOrders,
        })

      })
    } else {
      swal({
        title: "OOPS",
        text: "Session expired.Please Login!",
        icon: "warning",
        dangerMode: true,
        closeOnClickOutside: false,
      }).then((d) => {
        //console.log('ddddddddddddddddddd',d)
        if (d) {
          return window.location = "/"
        }
      })
    }
  }

  render() {

    const bodyDataArr = [];
    this.state.myOrders.map((order, i) => {
      var amount = 0;
      
      let customerName = ""; 
      if(Array.isArray(order.customer) && order.customer.length > 0);
        customerName = order.customer[0].firstName + " " + order.customer[0].lastName
      
      var obj = {
        "orderId": order.orderItems._id,
        "orderDate" : moment(order.orderDate).format('DD/MM/YYYY'),
        "customerName": customerName,
        "price": '$' + order.orderItems.totalOrderItemAmount,
        "paymentType": order.paymentType,
        "orderStatus": order.orderItems.orderStatus,
        "viewOrder": <a href={'/orderdetail?orderId=' + order.orderItems._id}>View</a>
      }
      bodyDataArr.push(obj);
    })

    const data = {
      columns: [
        {
          label: 'Order-Id',
          field: 'orderId',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Order-date',
          field: 'orderDate',
          sort: 'asc',
          width: 70
        },
        {
          label: 'Customer Name',
          field: 'customerName',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Payment Type',
          field: 'paymentType',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Order Status',
          field: 'orderStatus',
          sort: 'asc',
          width: 150
        },
        {
          label: 'View',
          field: 'viewOrder',
          sort: 'asc',
          width: 100
        }
      ],
      rows: bodyDataArr
    }

    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h4 className="page-title">Order List</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Order List</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <MDBDataTable
                      striped
                      bordered
                      hover
                      data={data}
                    />
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
  console.log('pppppppppppppppppppppp', state.inititateState);
  return {
    authenticateState: state.inititateState.authenticateState,
    userId: state.inititateState.userId,
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orderlistpage));


// export default Orderlistpage;