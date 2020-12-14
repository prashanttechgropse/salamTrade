import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';
import { MDBDataTable } from 'mdbreact';
import './orderlistpage.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./datatable.css";
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
  }

  componentWillMount() {
    this.fetchMyOrder();
  }


  fetchMyOrder() {

    //console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{===>', this.props.userId)
    axios.post(URL + '/api/admin/getAllOrderAdmin', {
    }).then((response) => {
      console.log('this.responsefdfddfdddddddddd', response.data.order);
      this.setState({
        myOrders: response.data.order,
      })
    })
  }

  render() {
    const bodyDataArr = [];

    this.state.myOrders.map((e, i) => {
      var obj = {
        "orderId": e.orderItems._id,
        "customerFullName": e.customerId[0] ? `${e.customerId[0].firstName} ${e.customerId[0].lastName}` : '',
        "orderCost": '$' + e.orderItems.totalOrderItemAmount,
        "paymentType": e.paymentType,
        "orderStatus": `${e.paymentType} - ${e.paymentStatus !== undefined ? e.paymentStatus : ''}`,
        "viewOrder": <a href={`/orderdetail/${e.orderItems._id}`}><i class="fa fa-eye" aria-hidden="true"></i></a>
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
          label: 'Customer Name',
          field: 'customerFull',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Price',
          field: 'orderCost',
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
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
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

function mapstateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    businesscategory: state.inititateState.businesscategory,
    businessId: state.inititateState.businessId
  }
}

export default withRouter(connect(mapstateToProps)(Orderlistpage));

// export default Orderlistpage;