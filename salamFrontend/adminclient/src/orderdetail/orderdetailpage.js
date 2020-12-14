import React from 'react';
import ReactDOM from 'react-dom';
import './orderdetailpage.css';
import action from '../action/action';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';
const URL = process.env.REACT_APP_SERVER_URL;

class Orderdetailpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: '',
      orderDetail: [],
      productDetail: {},
      userDetail: [],
      addressDetail: [],
      ordrAmount: 0,
      orderItems: []
    }

  }


  async componentWillMount() {
    this.fetchMyOrder();
  }

  fetchMyOrder() {

    axios.post(URL + '/api/admin/getOrderDetailAdmin', {
      orderId: this.props.match.params.id
    }).then((response) => {
      console.log('this.responsefdfddfdddddddddd', response.data);

      if (Object.keys(response.data.order).length > 0) {
        const orderDetail = response.data.order;

        this.setState({
          orderDetail,
          userDetail: orderDetail.customer !== null ? orderDetail.customer[0] : {},
          orderItems: [orderDetail.orderItems],
          productDetail: orderDetail.product[0] || {},
          addressDetail: orderDetail.address !== null ? orderDetail.address[0] : {},
          totalOrderCost: orderDetail.orderItems.totalOrderItemAmount
        })
      }

      //  response.data.resultData[0].orderDetail.product.forEach(element => {
      //   if(element.vendorId==this.props.userId){
      //     this.setState({
      //       ordrAmount:parseFloat(this.state.ordrAmount)+parseFloat(element.total)
      //     })
      //     // amount=parseFloat(amount)+parseFloat(element.total)
      //   }
      // });


      // this.setState({
      //   orderDetail : response.data.resultData[0].orderDetail,
      //   userDetail : response.data.resultData[0].orderDetail.userId,
      //   productDetail : response.data.resultData[0].productDetail,
      //   addressDetail:response.data.resultData[0].addressData[0],
      // })
    })

    console.log('orderDetailorderDetailorderDetailorderDetailorderDetail', this.state.addressDetail)

  }



  render() {
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h4 className="page-title">Order Detail</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Order Detail</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className=" " id="profile-log-switch">
                    <div className="fade show active " >
                      <div className="table-responsive border userdetail ">
                        <table className="table row table-borderless w-100 m-0 ">
                          <tbody className="col-lg-4 p-0">
                            <tr>
                              <td><strong>Order Id:</strong> #{this.state.orderDetail._id}</td>
                            </tr>
                            <tr>
                              <td><strong>Order Date :</strong> {this.state.orderDetail.orderDate}</td>
                            </tr>
                            <tr>
                              <td><strong>Order Amount :</strong> ${this.state.orderDetail.totalOrderCost}</td>
                            </tr>
                            <tr>
                              <td><strong>Order Status :</strong> {this.state.orderDetail.orderStatus}</td>
                            </tr>
                          </tbody>
                          <tbody className="col-lg-4 p-0">
                            <tr>
                              <td><strong>User Id :</strong> #{this.state.userDetail._id}</td>
                            </tr>
                            <tr>
                              <td><strong>User Name :</strong> {this.state.userDetail.firstName + ' ' + this.state.userDetail.lastName}</td>
                            </tr>
                            <tr>
                              <td><strong>Email Id :</strong> {this.state.userDetail.email}</td>
                            </tr>
                            <tr>
                              <td><strong>Mobile No :</strong> {this.state.userDetail.mobile}</td>
                            </tr>
                          </tbody>
                          <tbody className="col-lg-4 p-0">
                            <tr>
                              <td><strong>Address :</strong> {this.state.addressDetail.address}</td>
                            </tr>
                            <tr>
                              <td><strong>Full Name :</strong> {this.state.addressDetail.fullName}</td>
                            </tr>
                            <tr>
                              <td><strong>Pincode :</strong>  {this.state.addressDetail.pincode} </td>
                            </tr>
                            <tr>
                              <td><strong>Mobile No :</strong>  {this.state.addressDetail.mobile}</td>
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
          <div className="row row-cards order-detailpage">
            <div className="col-lg-12">
              <div className="card mt-5 store">
                <div className="table-responsive">
                  <table className="table card-table table-vcenter">
                    <tr>
                      <th className="wd-15p">Images</th>
                      <th className="wd-15p">Product Name</th>
                      <th className="wd-15p">Price</th>
                      <th className="wd-15p">Quantity</th>
                      <th className="wd-20p">Discount</th>
                      <th className="wd-20p">Total Price</th>
                    </tr>
                    {
                      this.state.orderItems.map((item, i) => {

                        return (
                          <tr>
                            <td><img src={this.state.productDetail ? this.state.productDetail.file1 : ''} alt="" className="h-8 w-8 bg-white" /></td>

                            <td>{this.state.productDetail.productName}</td>
                            <td >
                              <strong>${item.pricePerUnit}</strong>
                            </td>
                            <td>{item.totalUnits}</td>
                            <td>${item.discount}</td>
                            <td>
                              <strong>${item.totalOrderItemAmount}</strong>
                            </td>
                          </tr>
                        )

                      })
                    }
                  </table>
                </div>
              </div>
              <div className="card ">
                <div className="card-header "><div className="card-title">Order Summary</div></div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Cart Total</td>
                          <td className="text-right">${this.state.totalOrderCost}</td>
                        </tr>
                        <tr>
                          <td><span>Shipping Charges</span></td>
                          <td className="text-right price"><span>${this.state.orderDetail.shippingCharges}</span></td>
                        </tr>
                        <tr>
                          <td><span>Order Total</span></td>
                          <td><h2 className="price text-right">${this.state.totalOrderCost + this.state.orderDetail.shippingCharges}</h2></td>
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

export default withRouter(connect(mapstateToProps)(Orderdetailpage));

// export default Orderdetailpage;