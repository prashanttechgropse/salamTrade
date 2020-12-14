import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import swal from "sweetalert";
import { addToCartAction } from "../action/cart.action";
import { addToWishlistAction } from "../action/wishlist.action";

import "react-toastify/dist/ReactToastify.css";
import "./description.css";

var divStyle = {
  cursor: "pointer",
};
var divStyleDisabled = {
  cursor: "no-drop",
};

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: [],
      cartQuantity: 0,
      isWishlist: 0,
    };
  }

  componentDidMount() {
    // this.fetchProductDetail();
    if (this.props.productData !== undefined) {
      this.setState({
        productDetail: this.props.productData.product,
        cartQuantity: this.props.productData.cartQuantity,
        isWishlist: this.props.productData.isWishlist,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productData !== undefined) {
      this.setState({
        productDetail: nextProps.productData.product,
        cartQuantity: this.props.productData.cartQuantity,
        isWishlist: nextProps.productData.isWishlist,
      });
    }
  }

  addToCart = (productId, userId, price, discount, action) => {
    const data = {
      userId: userId,
      productId: productId,
      price: price,
      discount: discount,
      quantity: 1,
      action: action,
    };
    this.props.addToCartAction(data);
  };

  addToWishlist(productId, userId) {
    const data = {
      userId: userId,
      productId: productId,
    };
    this.props.addToWishlistAction(data);
  }

  onClickDiv = (column) => {
    swal({
      title: "OOPS",
      text: "You need to login first!!!",
      icon: "warning",
      dangerMode: true,
      closeOnClickOutside: false,
    }).then((d) => {
      if (d) {
        return (window.location = "/Login");
      }
    });
  };

  clubSpecification = (specification) => {
    let objectSpec = {};
    specification.map((item) => {
      if (objectSpec[item.key] !== undefined) {
        objectSpec[item.key] = item.value + "-" + objectSpec[item.key];
      } else {
        objectSpec[item.key] = item.value;
      }
      return item;
    });
    return objectSpec;
  };

  renderSpecification = (specification = []) => {
    let itemOfRender = [];
    if (specification.length > 0) {
      const newSpecificationObject = this.clubSpecification(specification);
      Object.keys(newSpecificationObject).forEach((key, value) => {
        itemOfRender.push(
          <div>
            <span style={{ textTransform: "capitalize" }}>
              {key} : {newSpecificationObject[key]}
            </span>
            <br></br>
          </div>
        );
      });
    }
    return itemOfRender;
  };

  renderProductCartBox = () => {
    if (this.props.userId && this.props.cartQuantity >= 1) {
      return (
        <li>
          <div className="custom pull-left">
            <button
              type="button"
              className="reduced items-count"
              style={this.props.cartQuantity >= 1 ? divStyle : divStyleDisabled}
              onClick={() =>
                this.addToCart(
                  this.props.productDetail["_id"],
                  this.props.userId,
                  this.props.productDetail["productPrice"],
                  this.props.productDetail["discount"],
                  2
                )
              }
              disabled={this.props.cartQuantity < 1}
            >
              <i className="fa fa-minus">&nbsp;</i>
            </button>
            <input
              type="text"
              className="input-text qty"
              title="Qty"
              readOnly
              value={this.props.cartQuantity}
              maxLength="12"
              id="qty"
              name="qty"
            />
            <button
              style={divStyle}
              onClick={() =>
                this.addToCart(
                  this.props.productDetail["_id"],
                  this.props.userId,
                  this.props.productDetail["productPrice"],
                  this.props.productDetail["discount"],
                  1
                )
              }
              className="increase items-count"
              type="button"
            >
              <i className="fa fa-plus">&nbsp;</i>
            </button>
          </div>
        </li>
      );
    } else if (this.props.cartQuantity === 0) {
      return (
        <li>
          <a
            href="javascript:;"
            className="link-wishlist"
            style={divStyle}
            onClick={() =>
              this.addToCart(
                this.props.productDetail["_id"],
                this.props.userId,
                this.props.productDetail["productPrice"],
                this.props.productDetail["discount"],
                1
              )
            }
          >
            <span>Add to Cart</span>
          </a>
        </li>
      );
    } else {
      return (
        <li>
          {" "}
          <a
            href="javascript:;"
            className="link-wishlist"
            style={divStyle}
            onClick={() => this.onClickDiv(this.props.productDetail["_id"])}
          >
            <span>Add to Cart</span>
          </a>
        </li>
      );
    }
  };

  vendorName() {
    if (this.props.productDetail && this.props.productDetail.userId) {
      return this.props.productDetail.userId.name;
    }
    return "";
  }

  render() {
    return (
      <div className="product-shop col-lg-7 col-sm-7 col-xs-12">
        <div className="product-heading">
          <div className="row">
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <div className="product-name">
                <h1>{this.props.productDetail["productName"]}</h1>
                <p>{this.props.productDetail["brandName"]}</p>
              </div>
              <h2>Star Rating</h2>
              <span className="fa fa-star "></span>
              <span className="fa fa-star "></span>
              <span className="fa fa-star "></span>
              <span className="fa fa-star-o"></span>
              <span className="fa fa-star-o"></span>
            </div>
          </div>
        </div>
        <div className="price-block">
          <div className="price-box">
            <p className="special-price">
              {" "}
              <span className="price-label">Special Price</span>{" "}
              <span className="price">
                {" "}
                $
                {this.props.productDetail["productPrice"] -
                  (this.props.productDetail["productPrice"] *
                    this.props.productDetail["discount"]) /
                    100}{" "}
              </span>{" "}
            </p>
            <p className="old-price">
              {" "}
              <span className="price-label">Regular Price:</span>{" "}
              <span className="price">
                {" "}
                ${this.props.productDetail["productPrice"]}{" "}
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="short-description overview-product">
          <h2>Quick Overview</h2>
          <p>{this.props.productDetail["aboutProduct"]}</p>
          {this.renderSpecification(this.props.productDetail.specification)}
        </div>
        <br />
        <div className="short-description overview-product">
          <h6>Refund Policy</h6>
          {this.props.productDetail.isRefundable ? (
            <p>
              Days to refund :{" "}
              {this.props.productDetail.returnPolicy.daysToReturn}
              <br />
              {this.props.productDetail.returnPolicy.conditions}
            </p>
          ) : (
            <p>Not refundable</p>
          )}
        </div>
        <div className="short-description overview-product">
          <h6>
            <span>Sold by :</span> {this.vendorName()}
          </h6>
        </div>
        <div className="add-to-box pro-quantity">
          <div className="add-to-cart">
            <div className="pull-left"></div>
            <div className="email-addto-box adtocart">
              <ul className="add-to-links">
                {this.renderProductCartBox()}
                {this.props.userId ? (
                  this.props.isWishlist === 1 ? (
                    <li>
                      <span className="separator">|</span>
                      <a
                        href="javascript:;"
                        className="link-compare"
                        style={divStyle}
                        onClick={() =>
                          this.addToWishlist(
                            this.props.productDetail["_id"],
                            this.props.userId
                          )
                        }
                      >
                        <span>Remove From Wishlist</span>
                      </a>
                    </li>
                  ) : (
                    <li>
                      <span className="separator">|</span>
                      <a
                        href="javascript:;"
                        className="link-compare"
                        style={divStyle}
                        onClick={() =>
                          this.addToWishlist(
                            this.props.productDetail["_id"],
                            this.props.userId
                          )
                        }
                      >
                        <span>Add to Wishlist</span>
                      </a>
                    </li>
                  )
                ) : (
                  <li>
                    <span className="separator">|</span>
                    <a
                      href="javascript:;"
                      className="link-compare"
                      style={divStyle}
                      onClick={() =>
                        this.onClickDiv(this.props.productDetail["_id"])
                      }
                    >
                      <span>Add to Wishlist</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("object----------", state.product.productDetail.userId.name)
  return {
    authenticateState: state.inititateState.authenticateState,
    email: state.inititateState.email,
    userId: state.inititateState.userId,
    isWishlist: state.product.isWishlist,
    cartQuantity: state.product.cartQuantity,
    productDetail: state.product.productDetail,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addToCartAction,
      addToWishlistAction,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Description)
);
