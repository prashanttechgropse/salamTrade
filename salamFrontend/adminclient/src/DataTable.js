import moment from "moment"; // Example for onSort prop
import React, { Component } from "react"; // Import React
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import action from "../src/action/action";
import { connect } from "react-redux";
import { render } from "react-dom"; // Import render method
import Datatable from "react-bs-datatable"; // Import this package
import { showChatBoxAction } from "./component/chat/ChatAction";
import swal from "sweetalert";
import "./datatable.css";
const URL = process.env.REACT_APP_SERVER_URL;

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorList: [],
      type: "Vendor",
    };
    this.vendorFetch = this.vendorFetch.bind(this);
  }

  vendorFetch() {
    let obj = {};
    obj.type = this.state.type;
    axios.post(URL + "/api/admin/vendorList", obj).then((response) => {
      console.log("BBBBBBBBBBBBBBBBBB", response.data.data);
      this.setState({
        vendorList: response.data.data,
      });
    });
  }

  componentWillMount() {
    this.vendorFetch();
  }

  vendor(event, vendorId) {
    event.preventDefault();
    // console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWW',e.state.vendorList[i]._id);
    // axios.post(URL + '/api/admin/fetchVendorList', {
    //   vendorId: e.state.vendorList[i]._id
    // }).then((response) => {
    //   console.log('$$$$$$$$$$$$$$$$$$$$', response.data);
    //   if (response) {
    //     console.log('this.props.authenticate', this.props.authenticate);
    //     this.props.authenticate({
    //       type: 'authenticate',
    //       payload: response.data
    //     })
    //   }
    // })
    this.props.history.push(`/Vendordetail?vendorId=${vendorId}`);
  }

  deleteBusinessCat(e) {
    swal({
      title: "Are you sure want to Delete?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(URL + "/api/admin/deleteVendor", {
            businessId: e,
          })
          .then((res) => {
            swal("Vendor deleted SuccessFully!", {
              icon: "success",
            });
          });
        setTimeout(function () {
          return (window.location = "/Vendorlist");
        }, 2000);
      } else {
        // swal();
        return (window.location = "/Vendorlist");
      }
    });
  }

  render(e, i) {
    const header = [
      {
        title: "Vendor Name",
        prop: "vendorname",
        sortable: true,
        filterable: true,
      },
      {
        title: "Store Name",
        prop: "storename",
        sortable: true,
        filterable: true,
      },
      // { title: 'Name Uppercased', prop: 'realnameuppercase', cell: (row) => row.realname.toUpperCase() },
      { title: "Email Id", prop: "email", sortable: true, filterable: true },
      { title: "Mobile No", prop: "mobile", sortable: true, filterable: true },
      { title: "Status", prop: "status", sortable: true, filterable: true },
      { title: "Message", prop: "message", sortable: false, filterable: false },
      { title: "Action", prop: "action", sortable: true, filterable: true },
    ];

    let state = this.state;
    const body = [];
    state.vendorList.map((e, i) => {
      body.push({
        vendorname: e.name,
        storename: e.storeName,
        email: e.email,
        mobile: e.mobile,
        status: e.adminStatus,
        message: (
          <div
            className="actiontrans"
            onClick={() =>
              this.props.showChatBox({ receiverId: e._id, name: e.firstName })
            }
          >
            <img
              style={{ width: "30px", height: "30px" }}
              src="/images/comment_blue.svg"
              alt="image"
            />
          </div>
        ),
        action: (
          <div className="actiontrans">
            <a
              href="#"
              onClick={(event) => this.vendor(event, e._id)}
              value={e._id}
            >
              {" "}
              <i className="fa fa-eye "></i>
            </a>{" "}
            &nbsp;
            {/* <Link to = "#"  > <i className="fa fa-edit"></i></Link> &nbsp; */}
            {/* <Link to = "#" onClick = {this.deleteBusinessCat.bind(this,e._id)}   > <i className="fa fa-trash"></i></Link> */}
          </div>
        ),
      });
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

function mapStateToProps(state) {
  console.log("8888888888888888888", state.inititateState);
  return {
    authenticateState: state.inititateState.authenticateState,
    // email: state.inititateState.email,
    // userId: state.inititateState.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch),
    showChatBox: (data) => {
      dispatch(showChatBoxAction(data));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataTable)
);
