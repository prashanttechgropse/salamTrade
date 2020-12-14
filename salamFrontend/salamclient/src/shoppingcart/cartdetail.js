import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCartAction, fetchMyCartAction, removeProductFromCartAction } from '../action/cart.action';
import './cartdetail.css';
import './checkout.css';

class Cartdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCart: [],
      subTotal: 0,
      total: 0,
      totalProduct: 0,
      subTotalCartAmount: 0,
      totalCartAmount: 0,
      totalCartItem: 0
    }
  }

  componentWillMount() {
    this.fetchMyCart();
  }

  fetchMyCart() {
    const data = {
      userId: this.props.userId
    }
    this.props.fetchMyCartAction(data);
  }

  addToCart = (productId, userId, price, discount, action) => {
    const data = {
      userId: userId,
      productId: productId,
      price: price,
      discount: discount,
      quantity: 1,
      action: action
    }

    this.props.addToCartAction(data);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.cartDetail !== undefined && nextProps.cartDetail.myCart !== undefined) {
      this.setState({
        ...nextProps.cartDetail
      })
    } else if (nextProps.cartDetail.myCart === undefined) {
      this.props.history.replace('/');
    }
  }

  round2Decimal = (num) => {
    if (isNaN(num))
      return 0
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  renderCartTable = () => {
    return this.state.myCart.map((e, i) => {
      // this.state.subTotal = parseFloat(this.state.subTotal) + parseFloat(e.total);
      // this.state.totalProduct = parseInt(this.state.totalProduct) + 1;
      if (e.productId !== null) {
        return (
          <tr key={`product_number_${i}`}>
            <td className="image"><a className="product-image" title="Sample Product" ><img width="75" alt="Sample Product" src={e.productId.file1} /></a></td>
            <td><h3 className="product-name">{e.productId.productName}</h3>
              <h4>Brand: <span>{e.productId.brandName}</span></h4>
            </td>
            <td>
              <div className="price">
                <label htmlFor="price">Price</label>
                <h4>${parseFloat(e.amount).toFixed(2)}</h4>
                <span>{`Discount(${e.discount}%) : $${e.discountValue}`} </span><br />
                <span>{`Actual Price : $${e.price}`}</span>
              </div>
            </td>
            <td>
              <div className="add-to-box pro-quantity">
                <div className="add-to-cart">
                  <label htmlFor="qty">Qty:</label>
                  <div className="pull-left">
                    <div className="custom pull-left">
                      {
                        e.quantity === 1 ?
                          <button className="reduced items-count" type="button"><i className="fa fa-minus">&nbsp;</i></button>
                          :
                          <button onClick={() => this.addToCart(e.productId._id, this.props.userId, e.productId.productPrice, e.productId.discount, 2)} className="reduced items-count" type="button"><i className="fa fa-minus">&nbsp;</i></button>
                      }
                      <input readOnly type="text" className="input-text qty" title="Qty" value={e.quantity} maxLength="12" id="qty" name="qty" />
                      <button onClick={() => this.addToCart(e.productId._id, this.props.userId, e.productId.productPrice, e.productId.discount, 1)} className="increase items-count" type="button"><i className="fa fa-plus">&nbsp;</i></button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="price">
                <label htmlFor="price">Total</label>
                <h4>${parseFloat(e.total).toFixed(2)}</h4>
              </div>
            </td>
            <td>
              <div className="delete">
                <a href='javascript:;' onClick={() => this.props.removeProductFromCartAction({productId : e.productId._id, userId: this.props.userId, cartTotal : e.quantity })}> <i className="fa fa-close"></i></a>
              </div>
            </td>
          </tr>
        )
      }
      else {
        return <tr><td>Product doesn't exist</td></tr>
      }
    })
  }

  render() {
    return (
      <div>
        <section className="col-main col-sm-9  wow bounceInUp animated cartdetail-fluid">
          <div className="category-title">
            <h1>My Shopping Cart</h1>
            <div className="breadcrumbs">
              <div className="row">
                <ul>
                  <li className="home"> <a href="javascript:;" title="Go to Home Page">Home</a><span>/</span></li>
                  <li className="category13"> My Cart</li>
                </ul>
              </div>
            </div>
            <div className="productcart-fluid">
              <table className="table table-striped">
                <tbody>
                  {this.renderCartTable()}
                </tbody>
              </table>
            </div>
            <div className="continueshopping">
              <div className="row">
                <div className="col-sm-6">
                  <div className="leftpart">
                    <a href="/"><i className="fa fa-arrow-left"></i> Continue Shopping</a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="rightpart">
                    <h4><span>Subtotal: </span>${this.round2Decimal(this.state.subTotalCartAmount)}</h4>
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
                <li><a href='javascript:;'>Price({this.state.totalCartItem} Item)</a><span>${this.round2Decimal(this.state.subTotalCartAmount)}</span></li>
                <li><a href='javascript:;'>Delivery Charge</a><span>$15</span></li>
                <li><a href='javascript:;'>Subtotal</a><span>$
              {this.round2Decimal(this.state.totalCartAmount)}
                </span></li>
              </ul>
              <div className="checkouts"><a onClick={() => this.props.history.push('Deliveryaddress')} href="javascript:;">Checkout</a></div>
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
    userId: state.inititateState.userId,
    cartDetail: state.cart.cartDetail
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  addToCartAction,
  fetchMyCartAction,
  removeProductFromCartAction
}, dispatch)



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cartdetail));

// export default Cartdetail;