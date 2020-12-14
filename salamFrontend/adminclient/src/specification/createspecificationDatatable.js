import moment from "moment"; // Example for onSort prop
import React, { Component } from "react"; // Import React
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { render } from "react-dom"; // Import render method
import Datatable from "react-bs-datatable"; // Import this package
import swal from "sweetalert";
import "./datatable.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const URL = process.env.REACT_APP_SERVER_URL;

class SubCategoryDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategoryList: [],
      modal: false,
      subcategoryId: "",
      Subcategory: "",
    };
    this.fetchCategory = this.fetchCategory.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChangeSubCategory = this.handleChangeSubCategory.bind(this);
  }
  componentWillMount() {
    this.fetchCategory();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleChangeSubCategory(event) {
    this.setState({
      Subcategory: event.target.value,
    });
  }

  fetchCategory() {
    axios.post(URL + "/api/admin/fetchSubCategory").then((resp) => {
      console.log("OOOOOOOOOOOOOOOO", resp.data.subcategory);
      if (resp.data.subcategory !== null) {
        this.setState({
          subcategoryList: resp.data.subcategory,
        });
      }
    });
  }

  editSubcategory(e) {
    axios.get(URL + "/api/admin/editSubcategory/" + e).then((response) => {
      console.log("Responsepesponse", response.data.Subcategory);
      this.setState({
        subcategoryId: e,
        Subcategory: response.data.Subcategory,
      });
    });
    this.toggle();
  }

  updateSubCategory(e) {
    e.preventDefault();
    const obj = {};
    obj.subcategoryId = this.state.subcategoryId;
    obj.Subcategory = this.state.Subcategory;

    axios
      .post(
        URL + "/api/admin/updateSubcategory/" + this.state.subcategoryId,
        obj
      )
      .then((response) => {
        if (response.data.status === true) {
          alert(response.data.message);
          window.location = "/subcategory";
        } else {
          alert(response.data.message);
        }
      });
  }

  deleteSubCategory(e) {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(URL + "/api/admin/deleteSubCategory", {
            businessId: e,
          })
          .then((res) => {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          });
        setTimeout(function () {
          return (window.location = "/subcategory");
        }, 2000);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  render() {
    const header = [
      {
        title: "Business Category",
        prop: "businesscategory",
        sortable: true,
        filterable: true,
      },
      { title: "Category", prop: "category", sortable: true, filterable: true },
      {
        title: "SubCategory",
        prop: "subcategory",
        sortable: true,
        filterable: true,
      },
      { title: "Action", prop: "action", sortable: true, filterable: true },
    ];

    let state = this.state;
    const body = [];
    state.subcategoryList.map((e, i) => {
      if (e.businessId !== null) {
        body.push({
          businesscategory: e.businessId.businesscategory,
          category: e.categoryId.category,
          subcategory: e.subcategory,
          action: (
            <div className="actiontrans">
              <Link
                to="#"
                onClick={this.toggle}
                onClick={this.editSubcategory.bind(this, e._id)}
              >
                {" "}
                <i className="fa fa-edit"></i>
              </Link>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label>Sub Category </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.Subcategory}
                      onChange={this.handleChangeSubCategory}
                    />
                  </div>
                  <div className="form-group">
                    <button onClick={this.updateSubCategory.bind(this)}>
                      Update
                    </button>
                  </div>

                  <div style={{ marginTop: 10 }}></div>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
              <Link to="#" onClick={this.deleteSubCategory.bind(this, e._id)}>
                {" "}
                <i className="fa fa-trash"></i>
              </Link>{" "}
            </div>
          ),
        });
      }
    });
    //  console.log('Hello',body);
    const onSortFunction = {
      date(columnValue) {
        // Convert the string date format to UTC timestamp
        // So the table could sort it by number instead of by string
        return moment(columnValue, "Do MMMM YYYY").valueOf();
      },
    };

    const customLabels = {
      first: "<<",
      last: ">>",
      prev: "<",
      next: ">",
      show: "Display",
      entries: "rows",
      noResults: "There is no data to be displayed",
    };

    // In your render method
    return (
      <div className="salam_datatabl">
        <Datatable
          tableHeader={header}
          tableBody={body}
          keyName="userTable"
          tableClass="striped hover responsive"
          rowsPerPage={5}
          rowsPerPageOption={[5, 10, 15, 20]}
          initialSort={{ prop: "username", isAscending: true }}
          onSort={onSortFunction}
          labels={customLabels}
        />
      </div>
    );
  }
}

export default SubCategoryDataTable;
