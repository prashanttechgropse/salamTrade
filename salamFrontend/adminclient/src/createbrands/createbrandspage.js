import React from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './createbrandspage.css';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';
import BrandDataTable from './createbrandsDataTable'
const URL = process.env.REACT_APP_SERVER_URL;

class Createsbrandspage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: { value: '', isValidate: true, message: '' },
      file: '',
      brandImageTitle: 'Choose file',
      brandList: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    // this.fetchBrand = this.fetchBrand.bind(this);
    this.handleChageImage = this.handleChageImage.bind(this);
  }

  handleChageImage(e) {
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      aa = reader.result;
      this.setState({
        file: aa,
        brandImageTitle: data.name
      })
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
  }

  validate() {
    let state = this.state;
    if (validator.isEmpty(state.brand.value)) {
      state.brand.isValidate = false;
      state.brand.message = "Brands Can Not Be Blank";
      this.setState(state);
      return false;
    }

    if (state.file === null || validator.isEmpty(state.file)) {
      state.brand.isValidate = false;
      state.brand.message = "Brands Image cannot be empty";
      this.setState(state);
      return false;
    }

    return true;
  }

  // componentWillMount(){
  //   this.fetchBrand();
  // }


  submit(e) {
    e.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let obj = {};
      obj.brand = this.state['brand'].value;
      obj.file = this.state.file;

      axios.post(URL + '/api/admin/addBrand', obj).then((response) => {
        if (response.data.status === true) {
          swal("Successful",
            `${response.data.message}`,
          ).then((d) => {
            return window.location = "/createBrand"
          })

        } else {
          swal("Error",
            `${response.data.message}`)
            .then((d) => {
              // return this.props.history.push('/createBrand')
            })
        }
      })
    }
  }

  render(e, i) {
    const state = this.state;
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            {/* <h4 className="page-title">Create Brands</h4> */}
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Create  Brand</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-5 col-lg-5">
              <form className="card" onSubmit={this.submit}>
                <div className="card-header">
                  <h3 className="card-title">Hi ! Admin Create  Brand</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-12">
                      <div className="form-group">

                        <label className="form-label">Add Brand</label>

                        <input type='text' className="form-control custom-select" name="brand" value={state.brand.value} onChange={this.handleChange} />

                        <div style={{ fontSize: 13, color: "red" }}>
                          {state.brand.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12">
                      <div className="input-group">
                        <div className="form-group label-floating">
                          <label className="control-label uploadprofile">Upload Brand Image </label>
                          <div className="custom-file">
                            <input type="file" name="myImage" id="file" onChange={this.handleChageImage} className="custom-file-input" />
                            <label className="custom-file-label">{this.state.brandImageTitle}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12">
                      <button type="submit" className="btn btn-primary btn-block createcategory">Create</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <h2>Brand List</h2>
                    <BrandDataTable />
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

function mapstateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    businesscategory: state.inititateState.businesscategory,
    businessId: state.inititateState.businessId
  }
}

export default withRouter(connect(mapstateToProps)(Createsbrandspage));