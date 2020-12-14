import moment from 'moment'; // Example for onSort prop
import React, { Component } from 'react'; // Import React
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import action from '../action/action';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
// import { connect } from 'react-redux';
import swal from 'sweetalert';
import './datatable.css'
const URL = process.env.REACT_APP_SERVER_URL;


class ProductDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      //   type 	 : 'Vendor',
      visible: false,
    }
    this.productFetch = this.productFetch.bind(this);
  }

  productFetch() {
    let obj = {};
    this.setState({ visible: true });
    // obj.type = this.state.type;
    axios.post(URL + '/api/admin/productList', obj).then((response) => {
      console.log('BBBBBBBBBBBBBBBBBB', response.data.product);
      this.setState({ visible: false });
      this.setState({
        productList: response.data.product
      })
    })
  }

  vendor(e, i) {
  }

  componentWillMount() {
    this.productFetch();
  }


  product(e, i) {
    this.setState({ visible: true });
    axios.post(URL + '/api/admin/fetchProductList', {
      productId: e.state.productList[i]._id,
      userId: this.props.vendorId,
    }).then((response) => {
      if (response.data.status === true) {
        this.setState({ visible: false });
        if (response) {
          this.props.product({
            type: 'product',
            payload: response.data
          })
        }
      } else {
        this.setState({ visible: false });
      }
    })
    // this.setState({ visible: true });
    this.props.history.push('/Productdetail');
  }

  render(e, i) {
    const header = [
      { title: 'Business Category', prop: 'businesscategory', sortable: true, filterable: true },
      { title: 'Category', prop: 'category', sortable: true, filterable: true },
      { title: 'Product Name', prop: 'productname', sortable: true, filterable: true },
      // { title: 'Name Uppercased', prop: 'realnameuppercase', cell: (row) => row.realname.toUpperCase() },
      { title: 'Price', prop: 'price', sortable: true, filterable: true },
      { title: 'Quantity', prop: 'quantity', sortable: true, filterable: true },
      { title: 'Discount', prop: 'discount', sortable: true, filterable: true },
      { title: 'Action', prop: 'action', sortable: true, filterable: true },
    ];

    let state = this.state;
    console.log('state.productList', state.productList);
    const body = [];
    state.productList.map((e, i) => {
      body.push({
        'businesscategory': e.businesscategoryId && e.businesscategoryId.businesscategory ? e.businesscategoryId.businesscategory : '',
        'category': e.categoryId.category,
        'productname': e.productName,
        'price': '$' + e.productPrice,
        'quantity': e.quantity,
        'discount': e.discount + '%',
        'action': <div className="actiontrans" >
          <Link to="#" onClick={(e) => this.product(this, i)} value={e._id} > <i className="fa fa-eye "></i></Link> &nbsp;
        </div>
      });
    })

    const onSortFunction = {
      date(columnValue) {
        // Convert the string date format to UTC timestamp
        // So the table could sort it by number instead of by string
        return moment(columnValue, 'Do MMMM YYYY').valueOf();
      },
    };

    const customLabels = {
      first: '<<',
      last: '>>',
      prev: '<',
      next: '>',
      show: 'Display',
      entries: 'rows',
      noResults: 'There is no data to be displayed',
    };

    // In your render method
    return (
      <div className="salam_datatabl">
        <Loader visible={this.state.visible} type="Puff" className="signuploader" />
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
    )
  }
}

function mapStateToProps(state) {
  return {
    productState: state.productReduce.productState,
    userId: state.inititateState.userId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    product: bindActionCreators(action.product, dispatch),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDataTable));