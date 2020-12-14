import React from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Carousel from "react-multi-carousel";
import { addToCartAction } from "../action/cart.action";
import { addToWishlistAction } from "../action/wishlist.action";
import { fetchProductListAction } from "../action/product.action";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import "./newproduct.css";
import "./categories.css";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      visible: false,
    };
  }

  componentDidMount() {
    this.props.fetchProductListAction(this.props.userId);
  }

  addToCart = (event, productId, userId, price, discount, action) => {
    event.preventDefault();
    const data = {
      userId: userId,
      productId: productId,
      price: price,
      discount: discount,
      quantity: 1,
      action: 1,
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

  renderProductItem = () => {
    return this.props.productList.map((e, i) => {
      return (
        <div className="mutlislider" key={`productIndex_${i}`}>
          <div className="productimage">
            <a href={"Productdetail?product=" + e._id}>
              <img src={e.file1} alt="product 1" />
            </a>
            {e.quantity > 0 ? (
              <div className="viewproduct">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <a
                    href="javascript:;"
                    onClick={(event) =>
                      this.addToCart(event, e._id, this.props.userId)
                    }
                  >
                    <i className="fa fa-shopping-cart"></i> Add to Cart
                  </a>
                  <a
                    href="javascript:;"
                    onClick={() => this.addToWishlist(e._id, this.props.userId)}
                  >
                    <i className="fa fa-heart"></i> Add to Wishlist
                  </a>
                </div>
              </div>
            ) : (
              <div
                className="viewproduct"
                style={{ backgroundColor: "#000000d1" }}
              >
                {" "}
                Out of Stock{" "}
              </div>
            )}
          </div>
          <div className="Product-Info">
            <div className="Product-Info--Name" title={e.productName}>
              {e.productName}
            </div>
            <div className="Product-Info--Price">
              <div className="Product-Info--CurrentPrice">
                ${e.productPrice - (e.productPrice * e.discount) / 100}
              </div>
              <div className="Product-Info--PreviousPrice">
                ${e.productPrice}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };

    if (this.props.productList.length > 0 && !this.props.showLoader)
      return (
        <div className="container-fluid newproduct-fluid">
          <div className="container">
            <div className="headingpart">
              <h2>New Products</h2>
            </div>
            <Carousel responsive={responsive}>
              {this.renderProductItem()}
            </Carousel>
          </div>
        </div>
      );
    else if (this.props.productList.length === 0 && this.props.showLoader)
      return (
        <div className="container-fluid newproduct-fluid">
          <div className="container">
            <div className="headingpart">
              <h2>New Products</h2>
            </div>
            <div className="react-multi-carousel-list  undefined">
              <ul
                className="react-multi-carousel-track "
                style={{
                  transition: "none 0s ease 0s",
                  overflow: "unset",
                  transform: "translate3d(0px, 0px, 0px)",
                }}
              >
                <li
                  data-index="0"
                  aria-hidden="false"
                  className="react-multi-carousel-item react-multi-carousel-item--active "
                  style={{
                    flex: "1 1 auto",
                    position: "relative",
                    width: "228px",
                  }}
                >
                  <div className="mutlislider">
                    <div className="productimage">
                      <a href="javascript:;">
                        <img
                          alt="add_product"
                          style={{ border: "1px solid" }}
                          src="https://i.stack.imgur.com/h6viz.gif"
                        />
                        <div className="viewproduct">
                          <i className="fa fa-shopping-cart"></i>
                          Add to cart
                        </div>
                      </a>
                    </div>
                    <h3>----</h3>
                  </div>
                </li>
                <li
                  data-index="0"
                  aria-hidden="false"
                  className="react-multi-carousel-item react-multi-carousel-item--active "
                  style={{
                    flex: "1 1 auto",
                    position: "relative",
                    width: "228px",
                  }}
                >
                  <div className="mutlislider">
                    <div className="productimage">
                      <a href="javascript:;">
                        <img
                          alt="add_product1"
                          style={{ border: "1px solid" }}
                          src="https://i.stack.imgur.com/h6viz.gif"
                        />
                        <div className="viewproduct">
                          <i className="fa fa-shopping-cart"></i> Add to Cart
                        </div>
                      </a>
                    </div>
                    <h3>----</h3>
                  </div>
                </li>
                <li
                  data-index="0"
                  aria-hidden="false"
                  className="react-multi-carousel-item react-multi-carousel-item--active "
                  style={{
                    flex: "1 1 auto",
                    position: "relative",
                    width: "228px",
                  }}
                >
                  <div className="mutlislider">
                    <div className="productimage">
                      <a href="javascript:;">
                        <img
                          alt="add_product2"
                          style={{ border: "1px solid" }}
                          src="https://i.stack.imgur.com/h6viz.gif"
                        />
                        <div className="viewproduct">
                          <i className="fa fa-shopping-cart"></i> Add to Cart
                        </div>
                      </a>
                    </div>
                    <h3>----</h3>
                  </div>
                </li>
                <li
                  data-index="0"
                  aria-hidden="false"
                  className="react-multi-carousel-item react-multi-carousel-item--active "
                  style={{
                    flex: "1 1 auto",
                    position: "relative",
                    width: "228px",
                  }}
                >
                  <div className="mutlislider">
                    <div className="productimage">
                      <a href="javascript:;">
                        <img
                          alt="add_product3"
                          style={{ border: "1px solid" }}
                          src="https://i.stack.imgur.com/h6viz.gif"
                        />
                        <div className="viewproduct">
                          <i className="fa fa-shopping-cart"></i> Add to Cart
                        </div>
                      </a>
                    </div>
                    <h3>----</h3>
                  </div>
                </li>
                <li
                  data-index="0"
                  aria-hidden="false"
                  className="react-multi-carousel-item react-multi-carousel-item--active "
                  style={{
                    flex: "1 1 auto",
                    position: "relative",
                    width: "228px",
                  }}
                >
                  <div className="mutlislider">
                    <div className="productimage">
                      <a href="javascript:;">
                        <img
                          alt="add_product3"
                          style={{ border: "1px solid" }}
                          src="https://i.stack.imgur.com/h6viz.gif"
                        />
                        <div className="viewproduct">
                          <i className="fa fa-shopping-cart"></i> Add to Cart
                        </div>
                      </a>
                    </div>
                    <h3>----</h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    return null;
  }
}

function mapStateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    email: state.inititateState.email,
    userId: state.inititateState.userId,
    productList: state.product.productList,
    showLoader: state.product.showLoader,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addToCartAction,
      addToWishlistAction,
      fetchProductListAction,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
);
