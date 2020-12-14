import React from 'react';
import { withRouter } from 'react-router-dom'
import './checkout.css';
import './addressdetail.css';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import $ from 'jquery';
const URL = process.env.REACT_APP_SERVER_URL;

var divStyle = {
  cursor: 'pointer',
};

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCart: [],
      subTotal: 0,
      total: 0,
      totalProduct: 0,
    }
  }

  componentWillMount() {
    this.fetchMyCart();
  }

  fetchMyCart() {
    if (this.props.userId) {
      axios.post(URL + '/api/user/myCart', {
        userId: this.props.userId
      }).then((response) => {
        if (response.data.code === 100) {
          let subTotal = 0;
          let totalProduct = 0;
          if (Array.isArray(response.data.product)) {
            response.data.product.map((e, i) => {
              subTotal += parseFloat(e.total);
              totalProduct += parseInt(e.quantity);
              return i;
            })
          }
          this.setState({
            myCart: response.data.product,
            subTotal,
            totalProduct,
            total : parseFloat(15) + parseFloat(subTotal)
          }, () => {

          })
        } else {
          swal({
            title: "OOPS",
            text: "Your cart is empty.",
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

  goToPayment = () => {
    var addressData = $('.selectedAddress').attr('id');
    if (addressData) {
      this.props.history.push(`Paymentprocess?data=${addressData}`);
    } else {
      alert('Please select address...')
    }
  }

  render() {
    return (
      <aside className="col-right sidebar col-sm-4 wow bounceInUp animated checkout-fluid">
        <div className="block block-account">
          <div className="block-title">Price Detail</div>
          <div className="block-content">
            <ul>
              <li><a href="javascript:;">Price({this.state.totalProduct} Item)</a><span>${this.state.subTotal}</span></li>
              <li><a href="javascript:;">Delivery Charge</a><span>$15</span></li>

              <li><a href="javascript:;">Subtotal :</a><span>${this.state.total}
              
              </span></li>
            </ul>
            <div className="checkouts"><a href="javascript:;" style={divStyle} onClick={() => this.goToPayment()}>Checkout</a></div>
          </div>
        </div>
      </aside>
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

export default withRouter(connect(mapStateToProps)(Checkout));

// export default Checkout;