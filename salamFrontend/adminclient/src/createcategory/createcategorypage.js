import React from "react";
import ReactDOM from "react-dom";
import validator from "validator";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./createcategorypage.css";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import CategoryDataTable from "./categoryDataTable";
const URL = process.env.REACT_APP_SERVER_URL;

class Createsubcategorypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: { value: "", isValidate: true, message: "" },
      businessList: [],
      businesscategoryId: { value: "", isValidate: true, message: "" },
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchBusiness = this.fetchBusiness.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.fetchBusiness();
  }

  fetchBusiness() {
    axios.post(URL + "/api/admin/fetchBusiness").then((response) => {
      // console.log('HHHHHHHHHHHHHHHHH',response);
      this.setState({
        businessList: response.data.doc,
      });
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    let state = this.state;
    state[name].message = "";
    state[name].value = value;
    this.setState(state);
  }

  validate() {
    let state = this.state;
    if (validator.isEmpty(state.businesscategoryId.value)) {
      state.businesscategoryId.isValidate = false;
      state.businesscategoryId.message = "BusinessCategory Can Not Be Blank";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.category.value)) {
      state.category.isValidate = false;
      state.category.message = "Category Can Not Be Blank";
      this.setState(state);
      return false;
    }
    // if (!state.category.value.match(/^[A-Za-z ]+$/)) {
    //   state.category.isValidate = false;
    //   state.category.message = "Must Be Letters";
    //   this.setState(state);
    //   return false;
    // }
    return true;
  }

  submit(e) {
    e.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let obj = {};
      obj.category = this.state["category"].value;
      obj.businesscategoryId = this.state["businesscategoryId"].value;

      axios.post(URL + "/api/admin/Category", obj).then((response) => {
        if (response.data.status === true) {
          swal("Successful", `${response.data.message}`).then((d) => {
            window.location = "/category";
          });
        } else {
          swal("Error", `${response.data.message}`).then((d) => {
            // return this.props.history.push('/businesscategory')
          });
        }
      });
    }
  }

  render(e, i) {
    const state = this.state;
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            {/* <h4 className="page-title">Create  Category</h4> */}
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/Dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Category
              </li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-5 col-lg-5">
              <form className="card" onSubmit={this.submit}>
                <div className="card-header">
                  <h3 className="card-title">Hi ! Admin Create Category</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-12">
                      <div className="form-group">
                        <label className="form-label">
                          Select Business Category
                        </label>

                        <select
                          name="Category"
                          className="form-control custom-select"
                          name="businesscategoryId"
                          value={state.businesscategoryId.value}
                          onChange={this.handleChange}
                        >
                          <option value="" hidden selected>
                            Select
                          </option>
                          {this.state.businessList.map((e, i) => {
                            return (
                              <React.Fragment key={i}>
                                <option value={e._id}>
                                  {e.businesscategory}
                                </option>
                              </React.Fragment>
                            );
                          })}
                        </select>
                        <div style={{ fontSize: 13, color: "red" }}>
                          {state.businesscategoryId.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12">
                      <div className="form-group">
                        <label className="form-label">Category Name </label>
                        <input
                          type="text"
                          className="form-control"
                          name="category"
                          value={state.category.value}
                          onChange={this.handleChange}
                        />
                        <div style={{ fontSize: 13, color: "red" }}>
                          {state.category.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block createcategory"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <h2>Category List</h2>
                    <CategoryDataTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapstateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
    businesscategory: state.inititateState.businesscategory,
    businessId: state.inititateState.businessId,
  };
}

export default withRouter(connect(mapstateToProps)(Createsubcategorypage));
