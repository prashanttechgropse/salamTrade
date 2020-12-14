import React from "react";
import "./list.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import Sidebar from './sidebar';
const URL = process.env.REACT_APP_SERVER_URL;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      specificationList: [],
    };
    this.fetchProduct = this.fetchProduct.bind(this);
    this.fetchSpecification = this.fetchSpecification.bind(this);
  }

  componentWillMount() {
    this.fetchSpecification();
    this.fetchProduct();
  }

  fetchProduct() {
    axios.post(URL + "/api/user/fetchProduct").then((response) => {
      this.setState({
        productList: response.data.product,
      });
    });
  }

  fetchSpecification() {
    let obj = {};
    obj.subCategoryId = "5d7215b1c86f411656184ccd";
    axios.post(URL + "/api/user/fetchSpecification", obj).then((response) => {
      this.setState({
        specificationList: response.data.doc,
      });
    });
  }

  render() {
    return (
      <div className="row">
        <section className="col-main col-sm-9 col-sm-push-3 wow bounceInUp animated productlist-fluid">
          <div className="category-title">
            {/* <h1>Men T-Shirt</h1> */}
            <div className="breadcrumbs">
              <div className="row">
                <ul>
                  <li className="home">
                    {" "}
                    <a href="/" title="Go to Home Page">
                      Home
                    </a>
                    <span>/</span>
                  </li>
                  {/* <li className=""> <a href="javascript:;" title="Go to Home Page">Men Fashion</a><span>/</span></li> */}
                  {/* <li className="category13"> Men T-Shirt</li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="category-products">
            <ul className="products-grid">
              {
                // this.state.productList > 0 ?
                this.state.productList.map((e, i) => {
                  return (
                    <React.Fragment key={i}>
                      <li className="item col-lg-4 col-md-4 col-sm-6 col-xs-6">
                        <div className="col-item">
                          <div className="product-image-area">
                            {" "}
                            <a
                              className="product-image"
                              title="Sample Product"
                              href="javascript:;"
                            >
                              {" "}
                              <img
                                src={e.file1}
                                className="img-responsive"
                                style={{ height: "200px", width: "200px" }}
                                alt="a"
                              />{" "}
                            </a>
                            <div className="hover_fly">
                              {" "}
                              <a
                                className="exclusive ajax_add_to_cart_button"
                                href="/Shoppingcart"
                                title="Add Cart"
                              >
                                <div>
                                  <i className="icon-shopping-cart"></i>
                                  <span>
                                    <i className="fa fa-shopping-bag"></i> Add
                                    Cart
                                  </span>
                                </div>
                              </a>{" "}
                              <a className="quick-view" href="/Shoppingcart">
                                <div>
                                  <i className="icon-eye-open"></i>
                                  <span>
                                    <i className="fa fa-heart"></i>
                                  </span>
                                </div>
                              </a>{" "}
                            </div>
                          </div>
                          <div className="info">
                            <div className="info-inner">
                              <div className="row">
                                <div className="col-sm-7">
                                  <div className="item-title">
                                    {" "}
                                    <Link
                                      to="/Productdetail"
                                      title=" Sample Product"
                                    >
                                      {" "}
                                      {e.productName}{" "}
                                    </Link>{" "}
                                  </div>
                                </div>
                                <div className="col-sm-5">
                                  <div className="price-box pricepart">
                                    <p className="special-price">
                                      {" "}
                                      <span className="price">
                                        {" "}
                                        ${" "}
                                        {e.productPrice -
                                          (e.discount * e.productPrice) /
                                            100}{" "}
                                      </span>{" "}
                                    </p>
                                    <p className="old-price">
                                      {" "}
                                      <span className="price-sep">-</span>{" "}
                                      <span class="price"> </span>{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="item-content">
                                <div className="price-box">
                                  <p className="special-price">
                                    {" "}
                                    <span className="price">
                                      {" "}
                                      {e.brandName}{" "}
                                    </span>
                                  </p>
                                  {/* <p className="special-price"> <span className="price"> Size: </span><a href="javascript:;">M</a>,<a href="javascript:;">X</a>,<a href="javascript:;">L</a>,<a href="javascript:;">XL</a> </p> */}
                                </div>
                              </div>
                            </div>

                            <div className="clearfix"> </div>
                          </div>
                        </div>
                      </li>
                    </React.Fragment>
                  );
                })
              }
            </ul>
          </div>
        </section>
        <aside className="col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9 wow bounceInUp animated">
          <div className="block block-layered-nav">
            <div className="pricebox">
              <h3>Price</h3>
              <label className="price-cart">
                $10 - $99
                <input
                  type="radio"
                  name="price"
                  // checked="checked"
                />
                <span className="checkmark"></span>
              </label>
              <label className="price-cart">
                $100 - $499
                <input type="radio" name="price" />
                <span className="checkmark"></span>
              </label>
              <label className="price-cart">
                $500 - $999
                <input type="radio" name="price" />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="pricebox">
              <h3>Brand</h3>
              <label className="price-cart">
                Puma
                <input
                  type="checkbox"
                  //  checked="checked"
                />
                <span className="checkmark"></span>
              </label>
              <label className="price-cart">
                Addidas
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <label className="price-cart">
                Nike
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <label className="price-cart">
                Reebok
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </div>

            {this.state.specificationList.map((e, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="pricebox">
                    <h3>{e.fieldName}</h3>
                    {e.fieldValue.map((r, s) => {
                      return (
                        <React.Fragment key={s}>
                          <label className="price-cart">
                            {r.fieldValue}
                            <input type={e.fieldType} />
                            <span className="checkmark"></span>
                          </label>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </aside>
      </div>
    );
  }
}

export default List;
