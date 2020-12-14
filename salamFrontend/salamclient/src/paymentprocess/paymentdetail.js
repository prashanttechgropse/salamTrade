import React from 'react';
import './paymentdetail.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import StripeBtn from "../stripeBtn";
import Loading from './Loading'
const URL = process.env.REACT_APP_SERVER_URL;

class Paymentdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: 0,
      myCart: [],
      subTotal: 0,
      total: 0,
      shippingAmount: 15,
      isLoading: false
    }
  }

  fetchMyCart() {
    if (this.props.userId) {
      axios.post(URL + '/api/user/myCart', {
        userId: this.props.userId
      }).then((response) => {
        if (response.data.code === 100) {
          let subTotal = 0;
          response.data.product.forEach(element => {
            subTotal += parseFloat(element.total);
          });

          this.setState({
            subTotal,
            total: parseFloat(this.state.shippingAmount) + parseFloat(subTotal)
          })
        } else {
          swal({
            title: "OOPS",
            text: "Your Cart Is Empty.",
            icon: "warning",
            dangerMode: true,
            closeOnClickOutside: false,
          }).then((d) => {
            if (d) {
              return window.location = "/"
            }
          })
        }

      })
    } else {
      swal({
        title: "OOPS",
        text: "Session expired.Please Login!",
        icon: "warning",
        dangerMode: true,
        closeOnClickOutside: false,
      }).then((d) => {
        if (d) {
          return window.location = "/Login"
        }
      })
    }

  }

  securePayment() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let foo = params.get('data');

    if (this.props.userId) {
      if (this.state.paymentType === 0) {
        swal({
          title: "OOPS",
          text: "Select payment mode",
          icon: "warning",
          dangerMode: true,
          closeOnClickOutside: false,
        }).then((d) => {
          if (d) {
            // return window.location = "/Login"
          }
        })
      }
      else {
        axios.post(URL + '/api/user/getSingleAddress', {
          addressId: foo
        }).then((response) => {
          if (response.data.code === 100) {
            axios.post(URL + '/api/user/codOrder', {
              addressId: foo,
              userId: this.props.userId,
              orderType: this.state.paymentType,
              price: this.state.subTotal,
              shippingCharges: this.state.shippingAmount,
              amount: this.state.total
            }).then((orderResponse) => {
              if (orderResponse.data.code === 200) {
                swal({
                  title: "Success",
                  text: "Order placed successfully.",
                  icon: "success",
                  dangerMode: false,
                  closeOnClickOutside: false,
                }).then((d) => {
                  if (d) {
                    return window.location = "/myOrders"
                  }
                })
              } else {
                swal({
                  title: "OOPS",
                  text: response.data.message,
                  icon: "warning",
                  dangerMode: true,
                  closeOnClickOutside: false,
                }).then((d) => {
                  if (d) {
                    return window.location = "/"
                  }
                })
              }
            })
          } else {
            swal({
              title: "OOPS",
              text: "Incorrect AddressId",
              icon: "warning",
              dangerMode: true,
              closeOnClickOutside: false,
            }).then((d) => {
              if (d) {
                // return window.location = "/Login"
              }
            })
          }
        })
      }

    } else {
      swal({
        title: "OOPS",
        text: "Session expired.Please Login!",
        icon: "warning",
        dangerMode: true,
        closeOnClickOutside: false,
      }).then((d) => {
        if (d) {
          return window.location = "/Login"
        }
      })
    }

  }

  changePaymentType(data) {
    this.setState({
      paymentType: data
    })
  }

  saveOrderData = (data) => {

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let addressId = params.get('data');

    this.setState({
      isLoading: true
    })

    console.log("Address", addressId)
    axios
      .post(URL + "/api/user/payment", { ...data, addressId })
      .then(response => {

        if (response.data.success) {
          swal({
            title: "Success",
            text: "Payment processed successfully.",
            icon: "success",
            dangerMode: false,
            closeOnClickOutside: false,
          }).then((d) => {
            if (d) {
              return window.location = "/myOrders"
            }
          })
        } else {
          swal({
            title: "OOPS",
            text: response.data.message,
            icon: "warning",
            dangerMode: true,
            closeOnClickOutside: false,
          }).then((d) => {
          })
        }
      })
      .catch(error => {
        alert("Payment Error");
      });
  }
  showLoading = () => {

  }

  render() {
    return (
      <section className="col-main col-sm-8  wow bounceInUp animated payment-fluid">
        {this.state.isLoading ?
          <Loading /> : null}
        <div className="category-title">
          <h1>Payment Method</h1>
          <div className="paymentmode">
            <ul>
              <li>
                <label className="radiocontainer">
                  <StripeBtn
                    saveOrderData={this.saveOrderData}
                    payableAmount={this.props.payableAmount}
                    cartAmount={this.props.cartAmount}
                    shippingCharges={this.props.shippingCharges}
                    userId={this.props.userId} />
                  <input type="radio" onClick={() => this.changePaymentType('2')} value="2" name="payment" />
                  <span className="checkmark"></span>
                </label>
              </li>
              <li>
                <label className="radiocontainer">Cash On Delivery
                          <input type="radio" onClick={() => this.changePaymentType('1')} value="1" name="payment" />
                  <span className="checkmark"></span>
                </label>
              </li>
              <li>
                <div className="paybutton">
                  <div className="row">
                    <div className="col-sm-8">
                      <button type="button" onClick={() => this.securePayment()} className="btn btn-primary paynow" >Pay Now</button>
                    </div>
                    <div className="col-sm-4">
                      <div class="securemode"><p><i class="fa fa-lock" ></i> Secure Payment</p></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
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
    userId: state.inititateState.userId
  }
}

export default withRouter(connect(mapStateToProps)(Paymentdetail));

// export default Paymentdetail;