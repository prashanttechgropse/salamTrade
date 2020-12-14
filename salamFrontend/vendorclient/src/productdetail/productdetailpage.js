import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './productdetailpage.css';
const URL = process.env.REACT_APP_SERVER_URL;

class Productdetailpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contList: [],
      productId: '',
      productDetail: {}
    }
  }

  componentDidMount() {
    const productId = this.getUrlParameter('productId');
    if (productId) {
      this.setState({
        productId
      }, () => this.getProductDetail());
    }
  }

  getProductDetail = () => {
    axios.post(URL + '/api/vendor/fetchProductList', {
      productId: this.state.productId
    }).then((response) => {
      if (response) {
        this.setState({
          productDetail: response.data
        })
        // productDetail.product({
        //   type: 'product',
        //   payload: response.data
        // })
      }
    })
  }

  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  isNotNullOrUndefined = (value) => {
    if (value === undefined || value === null)
      return false
    return true
  }
  render() {
    const { productDetail } = this.state;
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h4 className="page-title">Product Detail</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Product Detail</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Product Image</h3>
                </div>
                <div className="card-body">
                  <div className="row mt-4">
                    {
                      this.isNotNullOrUndefined(productDetail.file1) ?
                        <div className="col-xs-6 col-md-3">
                          <a href="#" className="thumbnail ">
                            <img src={productDetail.file1} style={{ height: '254px', width: '250px' }} alt="thumb1" className="thumbimg" />
                          </a>
                        </div> : null
                    }
                    {
                      this.isNotNullOrUndefined(productDetail.file2) ?
                        <div className="col-xs-6 col-md-3">
                          <a href="#" className="thumbnail ">
                            <img src={productDetail.file2} style={{ height: '254px', width: '250px' }} alt="thumb1" className="thumbimg" />
                          </a>
                        </div> : null
                    }
                    {
                      this.isNotNullOrUndefined(productDetail.file3) ?
                        <div className="col-xs-6 col-md-3">
                          <a href="#" className="thumbnail ">
                            <img src={productDetail.file3} style={{ height: '254px', width: '250px' }} alt="thumb1" className="thumbimg" />
                          </a>
                        </div> : null
                    }
                    {
                      this.isNotNullOrUndefined(productDetail.file4) ?
                        <div className="col-xs-6 col-md-3">
                          <a href="#" className="thumbnail ">
                            <img src={productDetail.file4} style={{ height: '254px', width: '250px' }} alt="thumb1" className="thumbimg" />
                          </a>
                        </div> : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Product Detail</h3>
                </div>
                <div className="card-body">
                  <div className=" " id="profile-log-switch">
                    <div className="fade show active " >
                      <div className="table-responsive border userdetail ">
                        <table className="table row table-borderless w-100 m-0 ">
                          <tbody className="col-lg-4 p-0">
                            <tr>
                              <td><strong>Product Id:</strong> {productDetail.productId}</td>
                            </tr>
                            <tr>
                              <td><strong>Product Name :</strong>{productDetail.productName}</td>
                            </tr>
                            <tr>
                              <td><strong>Vendor Name :</strong> {productDetail.name} </td>
                            </tr>
                          </tbody>
                          <tbody className="col-lg-4 p-0">
                            <tr>
                              <td><strong>Price :</strong>{productDetail.productPrice} </td>
                            </tr>
                            <tr>
                              <td><strong>Discount:</strong> {productDetail.discount}</td>
                            </tr>
                            {/* <tr>
                                <td><strong>Vendor Name :</strong> {productDetail.name} </td>
                              </tr> */}
                            <tr>
                              <td><strong>Store Name :</strong> {productDetail.storeName} </td>
                            </tr>
                          </tbody>
                          <tbody className="col-lg-4 p-0">
                            <tr>
                              <td><strong>Quantity :</strong> {productDetail.quantity}</td>
                            </tr>
                            <tr>
                              <td><strong>Status :</strong> Available</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="row mt-5 profie-img">
                        <div class="col-md-12">
                          <div class="media-heading">
                            <h5><strong>About Product</strong></h5>
                          </div>
                          <p>
                            {productDetail.aboutProduct}
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    )
  }
}

// function mapStateToProps(state) {
//   return {
//     name: state.productReduce.name,
//     productId: state.productReduce.productId,
//     file1: state.productReduce.file1,
//     file2: state.productReduce.file2,
//     file3: state.productReduce.file3,
//     file4: state.productReduce.file4,
//     productName: state.productReduce.productName,
//     productPrice: state.productReduce.productPrice,
//     discount: state.productReduce.discount,
//     category: state.productReduce.category,
//     subCategory: state.productReduce.subCategory,
//     brandName: state.productReduce.brandName,
//     quantity: state.productReduce.quantity,
//     aboutProduct: state.productReduce.aboutProduct,
//     storeName: state.productReduce.storeName
//   }
// }

export default withRouter(Productdetailpage);