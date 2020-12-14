import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchField from 'react-search-field';
import axios from 'axios';
import './search.css';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = process.env.REACT_APP_SERVER_URL;
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      businesscategoryList: [],
      visible: false,
      cartTotal: 0
    };
  }

  componentDidMount() {
    const props = this.props;
    this.setState({
      businesscategoryList: props.businesscategoryList
    })
  }
  componentWillReceiveProps(nextProps) {
    const props = nextProps;
    this.setState({
      businesscategoryList: props.businesscategoryList,
      cartTotal: props.cartTotal
    })
  }

  searchJob = (event) => {
    let obj = {}
    obj.search = event;
    // obj.userId = this.props.userId;
    // obj.type = this.props.type;
    if (event !== undefined && event.length > 0) {
      this.fetchProductAccordingToSearchInput(event)
    }
  }

  fetchProductAccordingToSearchInput = (search) => {
    let obj = {}
    obj.search = search;
    axios.post(URL + '/api/user/searchBox', obj)
      .then((res) => {
        if (res) {
          if (Array.isArray(res.data.product) && res.data.product.length > 0) {
            this.props.history.push({
              pathname: 'Productlist',
              search: `?search_input=${search}`,
              state: { productList: res.data.product }
            })
          } else {
            toast.error("Sorry product not available !", {
              position: toast.POSITION.BOTTOM_RIGHT
            }, { autoClose: 500 });
          }
        }
      })
      .catch(error => {
        toast.error("Sorry product not available !", {
          position: toast.POSITION.BOTTOM_RIGHT
        }, { autoClose: 500 });
      })
  }

  fetchBusinessCategory() {
    this.setState({ visible: true });
    axios.post(URL + '/api/user/fetchBusinesscategory').then((response) => {
      if (response) {
        this.setState({ visible: false });
        this.setState({
          businesscategoryList: response.data.data,
          // businessCatData : response.data.business
        })
      }

    })
  }

  checkCart = () => {
    if (this.props.userId) {
      axios.post(URL + '/api/user/myCart', {
        userId: this.props.userId
      }).then((response) => {
        if (Array.isArray(response.data.product) && response.data.product.length > 0) {
          this.props.history.push('Shoppingcart')
        } else {
          toast.error("Your cart is empty. !", {
            position: toast.POSITION.BOTTOM_RIGHT
          }, { autoClose: 500 });
        }
      })
    } else {

      toast.error("First you have to login !", {
        position: toast.POSITION.BOTTOM_RIGHT
      }, { autoClose: 500 });
    }
  }

  render() {
    return (
      <header className="header-container">
        <div className="header-top">
          <Loader visible={this.state.visible} type="Puff" className="signuploader" />
          <div className="container">
            <div className="row">
              <div className="col-xs-6">
                <div className="welcome-msg hidden-xs"> Welcome To Salam Trade! </div>
              </div>
              <div className="col-xs-6">
                <div className="toplinks">
                  {
                    this.props.email ?
                      <div className="links">
                        <div className="wishlist">
                          <a title="My Wishlist" href='javascript:;' onClick={() => this.props.history.push("Mywishlist")}>
                            <span className="hidden-xs">Wishlist</span>
                          </a>
                        </div>
                        <div className="myaccount">
                          <Link to="Myprofile" >
                            <span className="hidden-xs">My Account</span>
                          </Link>
                        </div>
                      </div>
                      :
                      <div className="links">
                        <div className="myaccount"><a href="/Login" data-toggle="modal"><span className="hidden-xs">Login</span></a> <a href="/Signup" data-toggle="modal"><span className="hidden-xs">Signup</span></a> </div>
                      </div>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header header-serach">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-sm-3 col-md-2">
                <a className="logo" title="Souqalasal" href="/"><img alt="Souqalasal Logo" src="./images/logo/logo.png" /></a>
              </div>
              <div className="col-lg-8 col-sm-6 col-md-8">
                <div className="search-box">
                  <div>
                    <select name="category_id" className="cate-dropdown hidden-xs">
                      <option value="0">All Categories</option>
                      {
                        this.state.businesscategoryList.map((e, i) => {
                          return (
                            <option key={`new_option_${i}`} value={e.business_id}>{e.business_name}</option>
                          )
                        })
                      }
                    </select>
                    {/* <input type="text" placeholder="Search Products " value="" maxLength="70" className="" name="search" id="search"/> */}
                    <SearchField
                      placeholder="Search Products..."
                      onSearchClick={this.searchJob}
                      onEnter={this.searchJob}
                      classNames="test-class"
                    />
                    {/* <button id="submit-button" className="search-btn-bg"><span><i class="fa fa-search"></i></span></button> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-3 col-md-2">
                <div className="top-cart-contain">
                  <div className="mini-cart">
                    <div className="basket "> <a href="javascript:;" onClick={() => this.checkCart()}> <i className="fa fa-shopping-bag"></i>
                      <div className="cart-box">
                        <span className="title">My Cart</span>
                        {this.state.cartTotal ?
                          <span className="cart-count">{this.state.cartTotal}</span>
                          : null}
                      </div>
                    </a></div>
                    <div>
                    </div>
                  </div>
                  <div id="ajaxconfig_info">
                    <input value="" type="hidden" />
                    <input id="enable_module" value="1" type="hidden" />
                    <input className="effect_to_cart" value="1" type="hidden" />
                    <input className="title_shopping_cart" value="Go to shopping cart" type="hidden" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )

  }
}

function mapStateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    email: state.inititateState.email,
    userId: state.inititateState.userId,
    cartTotal: state.cart.cartTotal
  }
}

export default withRouter(connect(mapStateToProps)(Search));
// export default Search;