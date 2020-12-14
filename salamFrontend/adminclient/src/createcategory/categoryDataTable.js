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

class CategoryDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // businessList : [],
      categoryList: [],
      modal: false,
      categoryId: "",
      category: "",
    };
    this.fetchCategory = this.fetchCategory.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }
  componentWillMount() {
    this.fetchCategory();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleChangeCategory(event) {
    this.setState({
      category: event.target.value,
    });
  }

  fetchCategory() {
    axios.post(URL + "/api/admin/fetchCategoryPage").then((resp) => {
      console.log(resp.data.category);
      this.setState({
        categoryList: resp.data.category,
      });
    });
  }

  editCategory(e) {
    let that = this;
    axios.get(URL + "/api/admin/editCategory/" + e).then((response) => {
      this.setState({
        categoryId: e,
        category: response.data.category,
      });
    });
    that.toggle();
  }

  updateCategory(e, id) {
    e.preventDefault();
    const obj = {
      categoryId: this.state.categoryId,
      category: this.state.category,
    };

    if (this.state.category.length > 0) {
      axios
        .post(URL + "/api/admin/updateCategory/" + this.state.categoryId, obj)
        .then((response) => {
          if (response.data.status === true) {
            alert(response.data.message);
            window.location = "/category";
          } else {
            alert(response.data.message);
          }
        });
    } else {
      swal("Error", "Category name cannot be empty", "error");
    }
  }

  deleteCategory = (e) => {
    swal({
      title: "Are you sure you want to delete?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(URL + "/api/admin/deleteCategory", {
            businessId: e,
          })
          .then((res) => {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          });
        setTimeout(function () {
          return (window.location = "/category");
        }, 2000);
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  };

  render() {
    const header = [
      {
        title: "Business Category",
        prop: "businesscategory",
        sortable: true,
        filterable: true,
      },
      { title: "Category", prop: "category", sortable: true, filterable: true },
      // { title: 'Status', prop: 'status', sortable: true ,filterable: true},
      { title: "Action", prop: "action", sortable: true, filterable: true },
    ];

    let state = this.state;
    const body = [];
    state.categoryList.map((e, i) => {
      console.log("FFFFFFFFFF", e.businessId);
      if (e.businessId) {
        body.push({
          businesscategory: e.businessId.businesscategory,
          category: e.category,
          //  'status':
          //  <div className="card-options">
          //      <label className="custom-switch m-0">
          //        <input type="checkbox" value="1" className="custom-switch-input" />
          //        <span className="custom-switch-indicator"></span>
          //      </label>
          //    </div>
          //  ,
          action: (
            <div className="actiontrans">
              <Link
                to="#"
                onClick={this.toggle}
                onClick={this.editCategory.bind(this, e._id)}
              >
                {" "}
                <i className="fa fa-edit"></i>
              </Link>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label>Category </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.category}
                      onChange={this.handleChangeCategory}
                    />
                  </div>
                  <div className="form-group">
                    <button onClick={this.updateCategory.bind(this)}>
                      Update
                    </button>
                  </div>

                  <div style={{ marginTop: 10 }}></div>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
              <Link to="#" onClick={() => this.deleteCategory(e._id)}>
                {" "}
                <i className="fa fa-trash"></i>
              </Link>
            </div>
          ),
        });
      }
    });
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

export default CategoryDataTable;
