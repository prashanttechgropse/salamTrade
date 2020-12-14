import React from 'react';
import './mywishlistdetail.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = process.env.REACT_APP_SERVER_URL;

var divStyle = {
  cursor: 'pointer',
};

class Mywishlistdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myWishlist: [],
    }
  }
  componentWillMount() {
    this.fetchMyWishlist();
  }

  fetchMyWishlist() {
    if (this.props.userId) {
      axios.post(URL + '/api/user/myWishlist', {
        userId: this.props.userId
      }).then((response) => {
        if (response.data.code === 100) {
          this.setState({
            myWishlist: response.data.product,
          })
        } else {
          this.setState({ myWishlist: [] })
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

  addToWishlist(productId, userId) {
    axios.post(URL + '/api/user/addToWishlist', {
      userId: userId,
      productId: productId,
    }).then((response) => {
      this.fetchMyWishlist();
      if (response.data.success) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        }, { autoClose: 500 });
        
      } else {
        toast.warn(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        }, { autoClose: 500 });
      }
    }).catch(error => {

      toast.error("Some error occured !", {
        position: toast.POSITION.BOTTOM_RIGHT
      }, { autoClose: 500 });
    })
  }

  addToCart = (productId, userId) => {
    axios.post(URL + '/api/user/addToCart', {
      userId: userId,
      productId: productId,
      quantity: 1,
      action: 1
    }).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        }, { autoClose: 500 });
        this.fetchMyWishlist();
      } else {
        toast.warn(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        }, { autoClose: 500 });
      }

    }).catch(error => {
      toast.error("Some error occured !", {
        position: toast.POSITION.BOTTOM_RIGHT
      }, { autoClose: 500 });
    })
  }

  render() {
    return (
      <section className="col-main col-sm-9  wow bounceInUp animated cartdetail-fluid">
        <div className="category-title">
          <h1>My Wishlist</h1>
          <div className="breadcrumbs">
            <div className="row">
              <ul>
                <li className="home"> <a href="/" title="Go to Home Page">Home</a><span>/</span></li>
                <li className="home"> My Account <span>/</span></li>
                <li className="category13"> My Wishlist</li>
              </ul>
            </div>
          </div>
          <div className="productcart-fluid">
            {
              (this.state.myWishlist[0]) ? <table className="table table-striped">  <tbody>
                {
                  this.state.myWishlist.map((e, i) => {
                    if (e.productId !== null)
                      return (
                        <tr>
                          <td class="image">
                            <a href="javascript:;" class="product-image" title="Sample Product">
                              <img width="75" alt="Sample Product" src={e.productId.file1} /></a></td>
                          <td><h3 className="product-name">{e.productId.productName}</h3>
                            <h4>Brand: <span>{e.productId.brandName}</span></h4></td>

                          <td>
                            <div className="price">
                              <label name="price">Price</label>
                              <h4>${e.productId.productPrice}</h4>
                            </div>
                          </td>
                          <td>
                            <div className="price">
                              <label name="price">Discount</label>
                              <h4>${e.productId.discount}</h4>
                            </div>
                          </td>
                          <td>
                            <div className="cart-add">
                              <a href={"/Productdetail?product=" + e.productId._id}> <i className="fa fa-eye"></i></a>
                            </div>
                          </td>
                          <td>
                            <div className="cart-add">
                              <a href="javascript:;" style={divStyle} onClick={() => this.addToCart(e.productId._id, this.props.userId)}><i class="fa fa-shopping-bag"></i></a>
                            </div>
                          </td>
                          <td>
                            <div className="delete">
                              <a href="javascript:;" style={divStyle} onClick={() => this.addToWishlist(e.productId._id, this.props.userId)}> <i className="fa fa-close"></i></a>
                            </div>
                          </td>
                        </tr>
                      )
                      return e;
                  })

                }

              </tbody>
              </table>
                : <h4 style={{ padding: '93px 260px' }}>Your wishlist is empty.</h4>
            }
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

export default withRouter(connect(mapStateToProps)(Mywishlistdetail));
// export default Mywishlistdetail;