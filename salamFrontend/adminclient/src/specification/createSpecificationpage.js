import React from "react";
import ReactDOM from "react-dom";
import validator from "validator";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./createSpecificationPage.css";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import SubCategoryDataTable from "./createspecificationDatatable";
const URL = process.env.REACT_APP_SERVER_URL;

class Createsubcategorypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategory: { value: "", isValidate: true, message: "" },
      fieldType: { value: "", isValidate: true, message: "" },
      fieldName: { value: "", isValidate: true, message: "" },
      businessList: [],
      businesscategory: { value: "", isValidate: true, message: "" },
      categoryList: [],
      category: { value: "", isValidate: true, message: "" },
      subCategoryList: [],
      fieldValue: "",
      shareholders: [{ fieldValue: "" }],
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchBusinessCategory = this.fetchBusinessCategory.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.fetchBusinessCategory();
    this.fetchCategory();
  }

  fetchCategory() {
    axios.post(URL + "/api/admin/fetchcategory").then((response) => {
      // console.log('666666666666666',response);
      if (response.data.category !== null) {
        this.setState({
          categoryList: response.data.category,
        });
      }
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
    if (validator.isEmpty(state.businesscategory.value)) {
      state.businesscategory.isValidate = false;
      state.businesscategory.message = "BusinessCategory Can Not Be Blank";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.category.value)) {
      state.category.isValidate = false;
      state.category.message = "Category Can Not Be Blank";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.subCategory.value)) {
      state.subCategory.isValidate = false;
      state.subCategory.message = "Sub Category Can Not Be Blank";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.fieldType.value)) {
      state.fieldType.isValidate = false;
      state.fieldType.message = "Please Fill The FieldType";
      this.setState(state);
      return false;
    }
    if (validator.isEmpty(state.fieldName.value)) {
      state.fieldName.isValidate = false;
      state.fieldName.message = "Please Fill The FiledName";
      this.setState(state);
      return false;
    }
    // if(validator.isEmpty(state.shareholders.value)){
    //   state.shareholders.isValidate = false;
    //   state.shareholders.message = "Please Fill The Value";
    //   this.setState(state);
    //   return false;
    // }
    return true;
  }

  fetchBusinessCategory() {
    axios.post(URL + "/api/admin/fetchBusiness").then((response) => {
      console.log("HHHHHHHHHHHHHHHHH", response);
      if (response.data.doc !== null) {
        this.setState({
          businessList: response.data.doc,
        });
      }
    });
  }

  submit(e, i, shareholders) {
    e.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let obj = {};
      obj.subCategory = this.state["subCategory"].value;
      obj.businesscategory = this.state["businesscategory"].value;
      obj.category = this.state["category"].value;
      obj.fieldType = this.state["fieldType"].value;
      obj.fieldName = this.state["fieldName"].value;
      obj.fieldValue = this.state.shareholders;
      console.log("RRRRRRRRRRRR", obj);

      axios.post(URL + "/api/admin/addSpecification", obj).then((response) => {
        console.log("LLLLLLLLLLLLLLLLLL", response);
        if (response.data.status === true) {
          swal("Successful", `${response.data.message}`).then((d) => {
            return (window.location = "/CreateSpecificationpage");
          });
        } else {
          swal("Error", `${response.data.message}`).then((d) => {
            // return this.props.history.push('/businesscategory')
          });
        }
      });
    }
  }

  handleSelect(e, i) {
    const { name, value } = e.target;
    let state = this.state;
    state[name].message = "";
    state[name].value = value;
    this.setState(state);
    // this.setState({ businesscategory: e.target.value });
    let obj = {};
    obj.businesscategory = e.target.value;
    // console.log('resseeepeeppe',obj);
    axios.post(URL + "/api/admin/fetchCategory", obj).then((resp) => {
      // console.log('resseeepeeppe',resp.data.category);
      this.setState({
        categoryList: resp.data.category,
      });
    });
  }

  handleSelectSubCategory(e) {
    const { name, value } = e.target;
    let state = this.state;
    state[name].message = "";
    state[name].value = value;
    this.setState(state);
    let obj = {};
    obj.category = e.target.value;
    console.log("object", obj);
    axios.post(URL + "/api/admin/fetchsubCategoryId", obj).then((resp) => {
      console.log("resseeepeeppe", resp.data.subcategory);
      this.setState({
        subCategoryList: resp.data.subcategory,
      });
    });
  }

  handleNameChange = (evt) => {
    this.setState({ fieldValue: evt.target.value });
  };

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, fieldValue: evt.target.value };
    });
    console.log("newShareholders", newShareholders);

    this.setState({ shareholders: newShareholders });
  };

  // handleSubmit = evt => {
  //   const { name, shareholders } = this.state;
  //   alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  // };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ fieldValue: "" }]),
    });
  };

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx),
    });
  };

  render(e, i, shareholder) {
    const state = this.state;
    console.log("////////////////", this.state.shareholders);
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            {/* <h4 className="page-title">Create Sub Category Specification</h4> */}
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/Dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Sub Category Specification{" "}
              </li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <form className="card" onSubmit={this.submit}>
                <div className="card-header">
                  <h3 className="card-title">
                    Hi ! Admin Create Sub Category Specification
                  </h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Business Category</label>

                        <select
                          name="Category"
                          className="form-control custom-select"
                          name="businesscategory"
                          value={state.businesscategory.value}
                          onChange={this.handleChange}
                          onChange={this.handleSelect.bind(this)}
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
                          {state.businesscategory.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label">Category Name </label>
                        <select
                          name="Category"
                          className="form-control custom-select"
                          name="category"
                          value={state.category.value}
                          onChange={this.handleChange}
                          onChange={this.handleSelectSubCategory.bind(this)}
                        >
                          <option value="" hidden selected>
                            Select
                          </option>
                          {this.state.categoryList.map((e, i) => {
                            return (
                              <React.Fragment key={i}>
                                <option value={e._id}>{e.category}</option>
                              </React.Fragment>
                            );
                          })}
                        </select>
                        <div style={{ fontSize: 13, color: "red" }}>
                          {state.category.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-12">
                      <div className="form-group">
                        <label className="form-label">Sub Category Name</label>
                        <select
                          className="form-control select2 custom-select"
                          name="subCategory"
                          value={state.subCategory.value}
                          onChange={this.handleChange}
                        >
                          <option value="" hidden selected>
                            Select
                          </option>
                          {this.state.subCategoryList.map((e, i) => {
                            return (
                              <React.Fragment key={i}>
                                <option value={e._id}>{e.subcategory}</option>
                              </React.Fragment>
                            );
                          })}
                        </select>
                        <div style={{ fontSize: 13, color: "red" }}>
                          {state.subCategory.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label"> Field Type </label>
                        <select
                          name="FieldType"
                          className="form-control custom-select"
                          name="fieldType"
                          value={state.fieldType.value}
                          onChange={this.handleChange}
                        >
                          <option value="" hidden selected>
                            {" "}
                            Select{" "}
                          </option>
                          <option>Radio</option>
                          <option>CheckBox</option>
                        </select>
                        <div style={{ fontSize: 13, color: "red" }}>
                          {state.fieldType.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label className="form-label"> Field Name </label>
                        <input
                          type="text"
                          style={{ marginTop: "0px" }}
                          className="form-control"
                          name="fieldName"
                          value={state.fieldName.value}
                          onChange={this.handleChange}
                        />
                        <div style={{ fontSize: 13, color: "red" }}>
                          {state.fieldName.message}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <div className="form-group">
                        <label
                          className="form-label"
                          style={{ marginBottom: "-12px" }}
                        >
                          {" "}
                          Field Value{" "}
                        </label>
                        <div>
                          {this.state.shareholders.map((e, idx) => (
                            <div className="shareholder">
                              <input
                                style={{ marginLeft: "0px", marginTop: "22px" }}
                                type="text"
                                value={e.fieldValue}
                                //  onChange = {this.handleChange}
                                onChange={this.handleShareholderNameChange(idx)}
                              />
                              {/* <div style = {{fontSize: 13, color: 'red'}}>
                                  {state.shareholders.message}
                                </div> */}
                              <button
                                type="button"
                                style={{ marginTop: "10px" }}
                                onClick={this.handleRemoveShareholder(idx)}
                                className="small"
                              >
                                <i class="fa fa-minus" aria-hidden="true"></i>
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={this.handleAddShareholder}
                            className="small"
                            style={{ marginLeft: "0px", marginTop: "10px" }}
                          >
                            Add More
                          </button>
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
                    <h2>Sub Category List</h2>
                    <SubCategoryDataTable />
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
