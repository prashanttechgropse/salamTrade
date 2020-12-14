import moment from 'moment'; // Example for onSort prop
import React, { Component } from 'react'; // Import React
import Datatable from 'react-bs-datatable'; // Import this package
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
const URL = process.env.REACT_APP_SERVER_URL;

class Orderdatatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myOrders: [],
      subTotal: 0,
      total: 0,
      totalProduct: 0,
    }
  }

  componentWillMount() {
    this.fetchMyOrder();
  }

  fetchMyOrder() {
    if (this.props.userId) {
      axios.post(URL + '/api/user/myOrders', {
        userId: this.props.userId
      }).then((response) => {
        this.setState({
          myOrders: response.data.product,
        })
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
  render() {
    const header = [
      { title: 'Order-id', prop: 'orderid', sortable: true, filterable: true },
      { title: 'Email', prop: 'email', sortable: true, filterable: true },
      // { title: 'Amount', prop: 'amount', cell: (row) => row.realname.toUpperCase() },
      { title: 'Amount', prop: 'amount', filterable: true },
      { title: 'Shipping Amount', prop: 'shippingamount', filterable: true },
      { title: 'Total', prop: 'total', sortable: true, filterable: true },
      { title: 'View', prop: 'view', sortable: true, filterable: true },
    ];

    const body = [
    ];

    if (this.state.myOrders) {
      this.state.myOrders.map((e, i) => {
        var obj = {
          "orderid": e._id,
          "email": e.customerId !== undefined && e.customerId !== null ? e.customerId.email : '',
          "amount": '$' + e.totalOrderCost,
          "shippingamount": '$' + e.shippingCharges,
          "total": '$' + (parseFloat(e.totalOrderCost) + parseFloat(e.shippingCharges)),
          "view": <a key={`view_key_${i}`} href="javascript:;" onClick={() => this.props.history.push(`orderdetail?orderId=${e._id}`)}><i className="fa fa-eye"></i></a>
        }
        body.push(obj);
        return i;
      })
    }

    const onSortFunction = {
      date(columnValue) {
        // Convert the string date format to UTC timestamp
        // So the table could sort it by number instead of by string
        return moment(columnValue, 'Do MMMM YYYY').valueOf();
      },
    };

    const customLabels = {
      first: '<',
      last: '>>',
      prev: '<',
      next: '>',
      show: 'Display',
      entries: 'rows',
      noResults: 'There is no data to be displayed',
    };
    return (
      <Datatable
        key={"order_table_in"}
        tableHeader={header}
        tableBody={body}
        keyName="userTable"
        tableClass="striped hover responsive"
        rowsPerPage={5}
        rowsPerPageOption={[5, 10, 15, 20]}
        initialSort={{ prop: "email", isAscending: true }}
        onSort={onSortFunction}
        labels={customLabels}
      />
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

export default withRouter(connect(mapStateToProps)(Orderdatatable));

// export default Orderdatatable;