import React from "react";
import "./list.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import "./sidebar.css";
import { addToCartAction } from "../action/cart.action";
import { addToWishlistAction } from "../action/wishlist.action";
import { removeDuplicates } from "../Utility/Config";

const URL = process.env.REACT_APP_SERVER_URL;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      specificationList: [],
      specification: [],
      subcategoryids: "",
      filterArr: [],
      filterResult: [],
      filterCheck: [],
    };
    this.fetchProduct = this.fetchProduct.bind(this);
    this.fetchSpecification = this.fetchSpecification.bind(this);
  }

  componentDidMount() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const subcategory = params.get("subcategory");
    const search_input = params.get("search_input");
    if (subcategory !== undefined && subcategory !== null) {
      this.fetchSpecification(subcategory);
      this.fetchProduct(subcategory);
    } else if (search_input !== undefined && search_input !== null) {
      if (
        this.props.location &&
        this.props.location.state !== undefined &&
        this.props.location.state.productList !== undefined
      ) {
        this.setState({
          productList: this.props.location.state.productList,
          filterArr: this.props.location.state.productList,
        });
      } else {
        this.getProductFromSearchInput(search_input);
      }
    }

    // this.hadleChangeSpecification();
  }

  getProductFromSearchInput = (search) => {
    let obj = {};
    obj.search = search;
    axios.post(URL + "/api/user/searchBox", obj).then((res) => {
      if (res) {
        this.setState({
          productList: res.data.product,
          filterArr: res.data.product,
        });
      }
    });
  };

  fetchProduct(subcategory) {
    axios
      .post(URL + "/api/user/fetchProduct", {
        subcategoryid: subcategory,
      })
      .then((response) => {
        this.setState({
          productList: response.data.product,
          filterArr: response.data.product,
        });
      });
  }

  fetchSpecification(subcategory) {
    let obj = {};
    obj.subCategoryId = subcategory;
    axios.post(URL + "/api/user/fetchSpecification", obj).then((response) => {
      this.setState({
        specificationList: response.data.doc,
      });
    });
  }

  onchangehandle = (e) => {
    if (e.selected == true) {
      e.checked = true;
    } else e.checked = false;
  };

  onclickhandleChangeSpecification = (e, i) => {
    // console.log(e);
    //console.log(e.checked);
    // current array of options
    e.selected = !e.selected;
    var specification = this.state.specification;
    let index;
    console.log(e.selected);

    // check if the check box is checked or unchecked
    if (e.selected) {
      // add the numerical value of the checkbox to options array
      specification.push(e.value);
      console.log(specification);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = specification.indexOf(e.value);
      specification.splice(index, 1);
      console.log(specification);
    }
    this.setState({ specification });
    // update the state with the new array of options

    console.log(this.state.specification);
    if (this.state.specification.length > 0) {
      let filterArrTemp = [];
      this.state.productList.forEach((product) => {
        (product.specification || []).forEach(async (specItem) => {
          this.state.specification.forEach((elm) => {
            if (elm === specItem.value) {
              if (product._id in filterArrTemp) {
                this.setState({
                  filterArr: [],
                  filterResult: [],
                  filterCheck: [],
                });
              } else {
                filterArrTemp.push(product);
              }
            }
          });
        });
      });
      filterArrTemp.map((img) => {
        if (this.state.filterCheck.indexOf(img._id) === -1) {
          this.state.filterResult.push(img);
          this.state.filterCheck.push(img._id);
        }
        return img;
      });
      this.setState({
        filterArr: removeDuplicates(filterArrTemp, "_id"),
      });
      // }
    } else if (this.state.specification.length == 0) {
      this.setState({
        filterArr: this.state.productList,
      });
    }

    // })
  };

  addItemToCart = (event, product) => {
    const data = {
      userId: this.props.userId,
      productId: product._id,
      price: product.productPrice,
      discount: product.discount,
      quantity: 1,
      action: 1,
    };

    this.props.addToCartAction(data);
  };

  addItemToWishList = (event, product) => {
    const data = {
      userId: this.props.userId,
      productId: product._id,
    };
    this.props.addToWishlistAction(data);
  };

  render() {
    return (
      <div className="row">
        <section className="col-main col-sm-9 col-sm-push-3 wow bounceInUp animated productlist-fluid">
          <div className="category-title">
            <div className="breadcrumbs">
              <div className="row">
                <ul>
                  <li className="home">
                    {" "}
                    <a href="/" title="Go to Home Page">
                      Home
                    </a>
                    <span>/ Product List</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="category-products">
            {this.state.filterArr[0] ? (
              <ul className="products-grid">
                {
                  //  this.state.productList > 0 ?
                  this.state.filterArr.map((e, i) => {
                    return (
                      <React.Fragment key={i}>
                        <li className="item col-lg-4 col-md-4 col-sm-6 col-xs-6">
                          <div className="col-item">
                            <div className="product-image-area">
                              <a
                                className="product-image"
                                title="Sample Product"
                                href={"/Productdetail?product=" + e._id}
                              >
                                <img
                                  alt="image_name"
                                  src={e.file1}
                                  className="img-responsive"
                                  style={{ height: "200px", width: "100%" }}
                                  alt="a"
                                />{" "}
                              </a>
                              <div className="hover_fly">
                                <a
                                  href="javascript:;"
                                  className="exclusive ajax_add_to_cart_button"
                                  onClick={(event) =>
                                    this.addItemToCart(event, e)
                                  }
                                  title="Add Cart"
                                >
                                  <div>
                                    <i className="icon-shopping-cart"></i>
                                    <span>
                                      <i className="fa fa-shopping-bag"></i> Add
                                      Cart
                                    </span>
                                  </div>
                                  {/* href={'Productdetail?product=' + e._id} */}
                                </a>
                                <a
                                  href="javascript:;"
                                  className="quick-view"
                                  onClick={(event) =>
                                    this.addItemToWishList(event, e)
                                  }
                                >
                                  <div>
                                    <i className="icon-eye-open"></i>
                                    <span>
                                      <i className="fa fa-heart"></i>Add
                                      Wishlist
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
                                      {/* <Link to ={"/Productdetail?product="+e._id}  title={e.productName} >  {e.productName}  </Link>  */}
                                      <a
                                        href={"/Productdetail?product=" + e._id}
                                        title={e.productName}
                                      >
                                        {e.productName}
                                      </a>
                                    </div>
                                  </div>
                                  <div className="col-sm-5">
                                    <div className="price-box pricepart">
                                      <p className="special-price">
                                        {" "}
                                        <span className="price">
                                          $
                                          {e.productPrice -
                                            (e.discount * e.productPrice) / 100}
                                        </span>
                                      </p>
                                      <p className="old-price">
                                        {" "}
                                        <span className="price-sep"></span>{" "}
                                        <span class="price">
                                          {e.productPrice}{" "}
                                        </span>{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="item-content">
                                  <div className="price-box">
                                    <p className="special-price">
                                      {" "}
                                      <span className="price">
                                        {e.brandName}
                                      </span>
                                    </p>
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
            ) : (
              <img alt="no_product_name" src="./no-product.png"></img>
            )}
          </div>
        </section>
        {this.state.specificationList.length > 0 ? (
          <aside className="col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9 wow bounceInUp animated">
            <div className="block block-layered-nav">
              {this.state.specificationList.map((e, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="pricebox">
                      <h3>{e.fieldName}</h3>
                      {e.fieldValue.map((r, s) => {
                        return (
                          <React.Fragment key={s}>
                            <label for={r.fieldValue} className="price-cart">
                              {r.fieldValue}
                            </label>
                            <input
                              type="checkbox"
                              value={r.fieldValue}
                              id={r.fieldValue}
                              selected={false}
                              onClick={() => {
                                console.log(r.fieldValue);
                                this.onclickhandleChangeSpecification(
                                  document.getElementById(r.fieldValue)
                                );
                              }}
                              onChange={() => {
                                this.onchangehandle(
                                  document.getElementById(r.fieldValue)
                                );
                              }}
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </aside>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.inititateState.userId,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
