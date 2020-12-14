import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import action from '../action/action';
import validator from 'validator';
import axios from 'axios';
import swal from 'sweetalert';
import './editproductpage.css';
import { access } from 'fs';
import action from '../action/action';
import Loader from '../common/Loader';

const URL = process.env.REACT_APP_SERVER_URL;

class Editproductpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesscategory: { value: '', isValidate: true, message: '' },
      category: { value: '', isValidate: true, message: '' },
      subCategory: { value: '', isValidate: true, message: '' },
      productName: { value: '', isValidate: true, message: '' },
      brandName: { value: '', isValidate: true, message: '' },
      productPrice: { value: '', isValidate: true, message: '' },
      quantity: { value: '', isValidate: true, message: '' },
      discount: { value: '', isValidate: true, message: '' },
      aboutProduct: { value: '', isValidate: true, message: '' },
      // file         : '',
      file1: this.props.file1,
      file2: this.props.file2,
      file3: this.props.file3,
      file4: this.props.file4,
      productId: '',
      businessList: [],
      categoryList: [],
      subCategoryList: [],
      loading: false,
      businesscategoryId: null,
      subCategoryId: null,
      specificationList: [],
      specification: []
    }
    // this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChageImage1 = this.handleChageImage1.bind(this);
    this.handleChageImage2 = this.handleChageImage2.bind(this);
    this.handleChageImage3 = this.handleChageImage3.bind(this);
    this.handleChageImage4 = this.handleChageImage4.bind(this);
  }
  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  componentDidMount() {
    const productId = this.getUrlParameter('productId');
    if (productId) {
      this.setState({
        productId
      }, () => this.getProductDetail());
    }
  }
  getProductDetail = () => {

    this.setState({
      loading: true
    })

    axios.post(URL + '/api/vendor/fetchProductList', {
      productId: this.state.productId
    }).then((response) => {
      if (response.data !== undefined) {
        const product = response.data
        this.setState({
          file1: product.file1,
          file2: product.file2,
          file3: product.file3,
          file4: product.file4,
          businesscategoryId: product.businesscategoryId,
          subCategoryId: product.subCategoryId,
          productName: { value: product.productName, isValidate: true, message: '' },
          productPrice: { value: product.productPrice, isValidate: true, message: '' },
          discount: { value: product.discount, isValidate: true, message: '' },
          businesscategory: { value: product.businesscategory, isValidate: true, message: '' },
          category: { value: product.category, isValidate: true, message: '' },
          subCategory: { value: product.subCategory, isValidate: true, message: '' },
          brandName: { value: product.brandName, isValidate: true, message: '' },
          quantity: { value: product.quantity + "", isValidate: true, message: '' },
          aboutProduct: { value: product.aboutProduct, isValidate: true, message: '' },
          categoryList: [{ category: product.category }],
          subCategoryList: [{ subcategory: product.subCategory }],
          loading: false,
          specification: product.specification
        }, () => {
          this.fetchBusinessCategory()
        })
      }
    }).catch(error => {
      this.setState({
        loading: false
      })
    })

  }

  fetchBusinessCategory = async () => {
    try {

      const businessListResponse = await axios.post(URL + '/api/vendor/fetchBusiness');

      const specificationListResponse = await axios.post(URL + '/api/vendor/fetchSpecification', { subCategoryId: this.state.subCategoryId });

      let specList = [];

      if (Array.isArray(specificationListResponse.data.doc) && Array.isArray(this.state.specification)) {
        let tempSpecList = specificationListResponse.data.doc;

        specList = tempSpecList.map(specItem => {
          let fieldValue = specItem.fieldValue.map(fieldItem => {
            let obj = this.state.specification.find(item => specItem.fieldName == item.key && fieldItem.fieldValue == item.value);
            return {
              ...fieldItem,
              isSelected: obj ? true : false
            }
          })

          return {
            ...specItem,
            fieldValue
          }
        })
      }

      if (specificationListResponse.data.status) {
        this.setState({
          specificationList: specList,
          businessList: businessListResponse.data.doc
        })
      }

    } catch (error) {

    }
  }

  handleBussinessChange = (e, i) => {
    const { name, value } = e.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
    let obj = {};
    obj.businesscategory = e.target.value
    axios.post(URL + '/api/vendor/fetchCategory', obj).then((resp) => {
      if (resp.data.status) {
        this.setState({
          categoryList: resp.data.category
        })
      }
    })
  }

  handleSelectSubCategory = (e) => {
    const { name, value } = e.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
    let obj = {};
    obj.category = e.target.value
    axios.post(URL + '/api/vendor/fetchsubCategory', obj).then((resp) => {
      if (resp.data.status) {
        this.setState({
          subCategoryList: resp.data.subcategory
        })
      }
    })
  }

  handleSelectSpecification = (e) => {
    const { name, value } = e.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
    let obj = {};
    obj.subCategoryId = e.target.value;

    axios.post(URL + '/api/vendor/fetchSpecification', obj).then((response) => {
      if (response.data.status) {
        this.setState({
          specificationList: response.data.doc
        })
      }
    })
  }


  handleChageImage1(e) {
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      aa = reader.result;
      this.setState({ file1: aa })
    }
  }

  handleChageImage2(e) {
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      aa = reader.result;
      this.setState({ file2: aa })
    }
  }

  handleChageImage3(e) {
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      aa = reader.result;
      this.setState({ file3: aa })
    }
  }

  handleChageImage4(e) {
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      aa = reader.result;
      this.setState({ file4: aa })
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = '';
    if (name === 'isRefundable')
      state[name].value = !value;
    else
      state[name].value = value
    this.setState(state);
  }

  validate() {
    let state = this.state;

    if (validator.isEmpty(state.category.value)) {
      state.category.isValidate = false;
      state.category.message = 'Please Select The Category';
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.subCategory.value)) {
      state.subCategory.isValidate = false;
      state.subCategory.message = 'Please Select The SUB-Category';
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.productName.value)) {
      state.productName.isValidate = false;
      state.productName.message = 'Please Fill The Product Name';
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.brandName.value)) {
      state.brandName.isValidate = false;
      state.brandName.message = "Please Fill The Brand Name";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.productPrice.value)) {
      state.productPrice.isValidate = false;
      state.productPrice.message = "Please Fill The Price";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.quantity.value)) {
      state.quantity.isValidate = false;
      state.quantity.message = "Please Fill The Quantity Of Product";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.discount.value)) {
      state.discount.isValidate = false;
      state.discount.message = "Please Fill The Discount Rate";
      this.setState(state);
      return false;
    }
    if (!validator.isEmpty(state.aboutProduct.value)) {
      if (!validator.isLength(state.aboutProduct.value, 100, 1000)) {
        state.aboutProduct.isValidate = false;
        state.aboutProduct.message = 'Description must be of 100- 1000 characters'
        this.setState(state);
        return false;
      }
      // return false;
    }
    // else {
    //   state.aboutProduct.isValidate = false;
    //   state.aboutProduct.message = 'Job Description cannot be blank'
    //   this.setState(state);
    //   return false;
    // }
    return true;
  }

  submit(event) {

    event.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let obj = {};
      obj.productId = this.state.productId;
      obj.businesscategory = this.state['businesscategory'].value;
      obj.category = this.state['category'].value;
      obj.subCategory = this.state['subCategory'].value;
      obj.productName = this.state['productName'].value;
      obj.brandName = this.state['brandName'].value;
      obj.productPrice = this.state['productPrice'].value;
      obj.quantity = this.state['quantity'].value;
      obj.discount = this.state['discount'].value;
      obj.aboutProduct = this.state['aboutProduct'].value;
      obj.file1 = this.state.file1;
      obj.file2 = this.state.file2;
      obj.file3 = this.state.file3;
      obj.file4 = this.state.file4;
      obj.specification = this.state.specification;


      axios.post(URL + '/api/vendor/editProduct', obj).then((response) => {
        if (response.data.status === true) {
          swal("Successful",
            `${response.data.message}`,
            "success").then((d) => {
              if (d) {
                return this.props.history.replace('/Productlist');
              }
            })
          if (response) {
            this.props.product({
              type: 'product',
              payload: response.data
            })
          }
        } else {
          swal("Error",
            `${response.data.message}`,
            "error").then((d) => {
              if (d) {
                return window.location = "/Editproductpage"
              }
            })
        }
      })
    }
  }

  hadleChangeSize = (e, i) => {
    if (e.target.type == 'radio') {
      this.setState({
        specification: [{
          'key': e.target.name,
          'value': e.target.value,
        }]
      });
    } else {
      if (e.target.checked) {
        const obj = this.state.specification.find(item => item.key == e.target.name && item.value == e.target.value);
        if (!obj) {
          this.setState({
            specification: [...this.state.specification, {
              'key': e.target.name,
              'value': e.target.value,
            }]
          }, () => {
            console.log('fruits', obj, this.state.specification);
          });
        }

      } else {
        const specArray = this.state.specification.filter(item => !(item.key == e.target.name && item.value == e.target.value));
        this.setState({
          specification: specArray
        },
          () => {
            console.log('fruits', this.state.specification);
          }
        );
      }
    }
  }

  newSize = () => {
    if (this.state.fValue !== "" && this.state.fValue !== null && this.state.fValue !== undefined) {
      this.setState({ specification: [...this.state.specification, this.state.fValue] })
    }
    this.setState({ fValue: '' })
  }


  render() {
    const state = this.state;

    if (state.loading)
      return <Loader />

    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Edit Product</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-12">
              <form method="post" className="card" onSubmit={this.submit}>
                <div className="card-header">
                  <h3 className="card-title">Hi ! Vendor Update Your  Product</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Business Category</label>
                        <select name="Category" className="form-control custom-select" name="businesscategory" value={state.businesscategory.value} onChange={this.handleBussinessChange}>
                          {
                            this.state.businessList.map((e, i) => {
                              return (
                                <React.Fragment key={i}>
                                  <option value={e.businesscategory} >{e.businesscategory}</option>
                                </React.Fragment>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select name="Category" className="form-control custom-select" name="category"
                          value={state.category.value}
                          onChange={this.handleSelectSubCategory.bind(this)}>
                          {
                            this.state.categoryList.map((e, i) => {
                              return (
                                <React.Fragment key={i}>
                                  <option value={e.category} >{e.category}</option>
                                </React.Fragment>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Select Sub Category</label>
                        <select name="Category" className="form-control custom-select" name="subCategory"
                          value={state.subCategory.value} onChange={this.handleSelectSpecification}>
                          {
                            this.state.subCategoryList.map((e, i) => {
                              return (
                                <React.Fragment key={i}>
                                  <option value={e._id} >{e.subcategory}</option>
                                </React.Fragment>
                              )
                            })
                          }
                        </select>

                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Product Name </label>
                        <input type="text" className="form-control" name="productName" value={state.productName.value} onChange={this.handleChange} />

                      </div>
                    </div>
                  </div>

                  {
                    this.state.specificationList.map((e, i) => {
                      return (
                        <React.Fragment key={i}>
                          <div className="row">
                            <div className="col-md-6 col-lg-6">
                              <div className="form-group">
                                <label className="form-label"  > {e.fieldName} </label>
                                {e.fieldValue.map((r, s) => {
                                  return (
                                    <React.Fragment key={s} >
                                      <input type={e.fieldType} defaultChecked={r.isSelected} name={e.fieldName} value={r.fieldValue}
                                        onClick={this.newSize}
                                        onChange={this.hadleChangeSize}
                                      />
                                      &nbsp;
                                      <label >  {r.fieldValue} </label> &nbsp;
                                    </React.Fragment>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    })
                  }
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Brand Name </label>
                        <input type="text" className="form-control" name="brandName" value={state.brandName.value} onChange={this.handleChange} />
                        {/* <div style = {{fontSize:13, color:"red"}}>
                            {state.brandName.message} 
                          </div> */}
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4">
                      <div className="form-group">
                        <label className="form-label">Product Price ($) </label>
                        <input type="text" className="form-control" name="productPrice" value={state.productPrice.value} onChange={this.handleChange} />
                        {/* <div style = {{fontSize:13, color:"red"}}>
                            {state.productPrice.message} 
                          </div> */}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Total Quantity </label>
                        <input type="text" className="form-control" name="quantity" value={state.quantity.value} onChange={this.handleChange} />
                        {/* <div style = {{fontSize:13, color:"red"}}>
                            {state.quantity.message} 
                          </div> */}
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Total Discount (%) </label>
                        <input type="text" className="form-control" name="discount" value={state.discount.value} onChange={this.handleChange} />
                        {/* <div style = {{fontSize:13, color:"red"}}>
                            {state.discount.message} 
                          </div> */}
                      </div>
                    </div>

                    {/* <div className="col-md-4 col-lg-4">
                      <div className="form-group">
                         <label className="form-label">Upload Product Image </label>
                          <div className="custom-file">
                           <input type="file"  name = "myImage" id = "file" onChange = {this.handleChageImage}   className="custom-file-input"  />
                            <label className="custom-file-label">Choose file</label>
                           </div>
                        </div>
                      </div> */}
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <label className="form-label">Upload Product Image </label>
                        <div className="custom-file">
                          <input type="file" name="myImage" id="file" accept="image/*" onChange={this.handleChageImage1} className="custom-file-input" />
                          <img src={this.state.file1 || "images/defaultImg.png"} style={{ height: '270px', width: '220px', marginTop: '50px' }} />
                          <label className="custom-file-label">Choose file</label>
                        </div>
                      </div>

                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <label className="form-label">Upload Product Image </label>
                        <div className="custom-file">
                          <input type="file" name="myImage" id="file" accept="image/*" onChange={this.handleChageImage2} className="custom-file-input" />
                          <img src={this.state.file2 || "images/defaultImg.png"} style={{ height: '270px', width: '220px', marginTop: '50px' }} />
                          <label className="custom-file-label">Choose file</label>
                        </div>
                      </div>

                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <label className="form-label">Upload Product Image </label>
                        <div className="custom-file">
                          <input type="file" name="myImage" id="file" accept="image/*" onChange={this.handleChageImage3} className="custom-file-input" />
                          <img src={this.state.file3 || "images/defaultImg.png"} style={{ height: '270px', width: '220px', marginTop: '50px' }} />
                          <label className="custom-file-label">Choose file</label>
                        </div>
                      </div>

                    </div>
                    <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                        <label className="form-label">Upload Product Image </label>
                        <div className="custom-file">
                          <input type="file" name="myImage" id="file" accept="image/*" onChange={this.handleChageImage4} className="custom-file-input" />
                          <img src={this.state.file4 || "images/defaultImg.png"} style={{ height: '270px', width: '220px', marginTop: '50px' }} />
                          <label className="custom-file-label">Choose file</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12" style={{ paddingTop: '150px' }}>
                      <div className="form-group">
                        <label className="form-label">About Product </label>
                        <textarea className="form-control" name="aboutProduct" value={state.aboutProduct.value}
                          onChange={this.handleChange} rows="6" placeholder="text here.."></textarea>
                        <div style={{ fontSize: 13, color: "red" }}>
                          {state.aboutProduct.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 col-lg-12">
                      <button type="submit" className="btn btn-primary pull-right">Submit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapstateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    userId: state.inititateState.userId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    product: bindActionCreators(action.product, dispatch)
  }
}

export default withRouter(connect(mapstateToProps, mapDispatchToProps)(Editproductpage));