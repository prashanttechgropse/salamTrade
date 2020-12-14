import React from 'react';

import './paymentpage.css';
import Processbar from './processbar.js';
import Paymentdetail from './paymentdetail.js';
import Checkout from './checkout.js';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

class Paymentpage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      shippingCharges: 15,
      cartAmount: 0,
      payableAmount: 0,
      totalNumberOfProduct:0
    }
  }

  componentDidMount() {
    if (this.props.userId) {
      this.fetchMyCart();
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

  fetchMyCart() {
    axios.post(URL + '/api/user/myCart', {
      userId: this.props.userId
    }).then((response) => {
      if (response.data.code === 100 && response.data.product) {

        let myCart = response.data.product;
        let cartAmount = 0;
        let totalNumberOfProduct = 0;
        myCart.map(item => {
          cartAmount += parseFloat(item.total);
          totalNumberOfProduct++;
          return item;
        })

        this.setState({
          myCart: response.data.product,
          cartAmount ,
          totalNumberOfProduct,
          payableAmount : cartAmount + this.state.shippingCharges
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
  }

  render() {
    return (
      <div className="main-container col2-right-layout myorder-fluid">
        <div className="container">
          <div className="row">
            <Processbar />
            <Paymentdetail payableAmount = {this.state.payableAmount} cartAmount={this.state.cartAmount} shippingCharges={this.state.shippingCharges} />
            <Checkout payableAmount = {this.state.payableAmount} cartAmount = {this.state.cartAmount}  totalProduct = {this.state.totalNumberOfProduct}/>
          </div>
        </div>
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

export default withRouter(connect(mapStateToProps)(Paymentpage));