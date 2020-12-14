import React from 'react';
import './orderdetail.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from './Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = process.env.REACT_APP_SERVER_URL;

class Orderdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: '',
      orderDetail: {},
      productDetail: [],
      userDetail: [],
      addressDetail: [],
      ordrAmount: 0,
      orderItems: [],
      totalOrderCost: 0,
      shippingCharges: 0,
      totalOrderItems: 0,
      show: false,
      singleOrderItem: {}
    }
  }
  async componentDidMount() {
    this.fetchMyOrder();
  }

  fetchMyOrder() {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let orderId = params.get('orderId');

    axios.get(`${URL}/api/user/myOrders/${orderId}`).then((response) => {

      if (response.data.product !== undefined && Object.keys(response.data.product).length > 0) {
        this.setState({
          orderItems: response.data.product.orderItems,
          totalOrderCost: response.data.product.totalOrderCost,
          shippingCharges: response.data.product.shippingCharges,
          orderDetail: response.data.product,
          addressDetail: response.data.product.addressId
        })
      }
    })
  }

  showModal = (item) => {
    this.setState({ show: true, singleOrderItem: item });
  };

  cancelOrderRequest(item) {

    if (item.productId.isRefundable) {
      const data = {
        orderId: this.state.orderDetail._id,
        subOrderId: item._id,
        userId: this.props.userId
      }

      axios.post(`${URL}/api/user/myOrders/${this.state.orderDetail._id}/cancel-request/${item._id}`, data)
        .then((response) => {

          if (response.data.success) {
            this.showModal(item);
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            }, { autoClose: 500 });
          }

        })
        .catch(error => {
          toast.error("Oops some issue on our end!", {
            position: toast.POSITION.BOTTOM_RIGHT
          }, { autoClose: 500 });
        })
    } else {
      toast.warn("This product is not refundable", {
        position: toast.POSITION.BOTTOM_RIGHT
      }, { autoClose: 500 });
    }
  }

  hideModal = () => {
    this.setState({ show: false });
  };

  cancelOrder = (data) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let orderId = params.get('orderId');

    axios.post(`${URL}/api/user/myOrders/${orderId}/cancel/${data.subOrderId}`, { ...data, userId: this.props.userId, orderId })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        }, { autoClose: 500 });
        window.location.reload();
      })
      .catch(error => {
        toast.error("Some error occured !", {
          position: toast.POSITION.BOTTOM_RIGHT
        }, { autoClose: 500 });
      })
  }

  render() {
    return (
      <div className="row">
        {this.state.show ?
          <Modal handleClose={this.hideModal} cancelOrder={this.cancelOrder} orderDetail={this.state.singleOrderItem} orderId={this.state.orderDetail._id} orderDate={this.state.orderDetail.orderDate}>
          </Modal> : null}
        <section className="col-main col-sm-9  wow bounceInUp animated cartdetail-fluid">
          <div className="category-title">
            <h1>Order Detail</h1>
            <div className="breadcrumbs">
              <div className="row">
                <ul>
                  <li className="home"> <a href="javascript:;" title="Go to Home Page">Home</a><span>/</span></li>
                  <li className="category13"> Order Detail</li>
                </ul>
              </div>
            </div>
            <div className="productcart-fluid">
              <table className="table table-striped">
                <tbody>
                  {
                    this.state.orderItems.map((item, i) => {
                      return (
                        <tr>
                          <td class="image"><a class="product-image" title="Sample Product" href="javascript:;"><img width="75" alt="Sample Product" src={item.productId.file1} /></a></td>
                          <td><h3 className="product-name">{item.productId.productName}</h3>
                            <h4>Brand: <span>{item.productId.brandName}</span></h4></td>
                          <td>
                            <div className="price">
                              <label for="price">Price</label>
                              <h4>${item.pricePerUnit}</h4>
                            </div>
                          </td>
                          <td>
                            <div className="price">
                              <label for="price">Discount</label>
                              <h4>${item.discount}</h4>
                            </div>
                          </td>
                          <td>
                            <div className="add-to-box pro-quantity">
                              <div className="add-to-cart">
                                <label for="qty">Qty:</label>
                                <div className="pull-left">
                                  <div className="custom pull-left">
                                    <input type="text" className="input-text qty" style={{ background: '#e9edf2', color: 'black', cursor: 'no-drop' }} title="Qty" value={item.totalUnits} readOnly maxLength="12" id="qty" name="qty" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="price">
                              <label for="price">Total Price</label>
                              <h4>${item.totalOrderItemAmount}</h4>
                            </div>
                          </td>

                          <td>
                            <div className="price">
                              <label for="price">Status</label>
                              <h4>{item.cancelItem ? 'Cancel Request Sent' :item.orderStatus}</h4>
                            </div>
                          </td>

                          <td>
                            {
                              !item.cancelItem ?

                                <div className="action">
                                  <label for="action">Action</label>
                                  <button type="button" className="btn btn-warning" onClick={() => this.cancelOrderRequest(item)}>Cancel Item</button>
                                </div> : null
                            }

                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>

              <div className="Other__Detail">
                <div className="Other__Detail--Payment">
                  <h4><span>Payment Method :</span>{this.state.orderDetail.paymentType}</h4>
                </div>
              </div>

              {/* <h4 style={{float : 'right'}}><span>Payment Method :</span>{this.state.orderDetail.paymentType}</h4> */}
            </div>
            <div className="continueshopping">
              <div className="row">
                <div className="col-sm-6">
                  <div className="leftpart">
                    <a href="/"><i class="fa fa-arrow-left"></i> Continue Shopping</a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
        <aside className="col-right sidebar col-sm-3 wow bounceInUp animated checkout-fluid">
          <div className="block block-account">
            <div className="block-title">Price Detail</div>
            <div className="block-content">
              <ul>
                <li><a href="javascript:;">Price({this.state.orderItems.length} Item)</a><span>${this.state.totalOrderCost}</span></li>
                <li><a href="javascript:;">Delivery Charge</a><span>${this.state.shippingCharges}</span></li>
                <li><a href="javascript:;">Subtotal</a><span>${this.state.totalOrderCost + this.state.shippingCharges}</span></li>
              </ul>
            </div>
          </div>
          <div className="block block-account">
            <div className="block-title">Shipping Detail</div>
            <div className="block-content">
              <ul>
                <li style={{ marginTop: '-10px' }}>{this.state.addressDetail.fullName},</li>
                <li style={{ marginTop: '-10px' }}>{this.state.addressDetail.mobile},</li>
                <li style={{ marginTop: '-10px' }}>{this.state.addressDetail.address},</li>
                <li style={{ marginTop: '-10px' }}>{this.state.addressDetail.pincode}</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    email: state.inititateState.email,
    userId: state.inititateState.userId
  }
}

export default withRouter(connect(mapStateToProps)(Orderdetail));

// export default Orderdetail;