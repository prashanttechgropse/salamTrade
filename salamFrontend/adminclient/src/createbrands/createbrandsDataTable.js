import moment from 'moment'; // Example for onSort prop
import React, { Component } from 'react'; // Import React
import validator from 'validator';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
import swal from 'sweetalert';

import EditBrand from './EditBrand';
import './datatable.css';
const URL = process.env.REACT_APP_SERVER_URL;

class BrandDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandList: [],
      modal: false,
      brandId: '',
      brandName: '',
      brandImage: '',
      message: '',
      brand_data: {}
    }
    this.fetchBrand = this.fetchBrand.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
  }

  toggle(brand_data) {
    this.setState({
      modal: !this.state.modal,
      brand_data
    })
  }

  componentWillMount() {
    this.fetchBrand();
  }

  handleChangeBrand(event) {
    this.setState({
      brandName: event.target.value
    })
  }

  fetchBrand() {
    axios.post(URL + '/api/admin/fetchBrands').then((resp) => {
      this.setState({
        brandList: resp.data.doc,
        modal: false
      })
    })
  }

  // editBrands(e) {
  //   let that = this
  //   axios.get(URL + '/api/admin/editBrands/' + e)
  //     .then(response => {
  //       this.setState({
  //         brandId: e,
  //         brandName: response.data.brandName,
  //       });
  //     })

  //   that.toggle()
  // }

  validate({ brandName, brandImage }) {
    let state = this.state;
    if (validator.isEmpty(brandName)) {
      state.message = "Brands Can Not Be Blank";
      return false;
    }

    if (brandImage === null || validator.isEmpty(brandImage)) {
      state.message = "Brands Image cannot be empty";
      return false;
    }

    return true;
  }

  updateBrands = ({ brandId, brandName, brandImage }) => {
    if (this.validate({ brandName, brandImage })) {
      const obj = {
        brandId,
        brandName,
        file: brandImage
      };
      axios.post(URL + '/api/admin/updateBrands/' + brandId, obj)
        .then(response => {
          console.log('response', response);
          if (response.data.status === true) {
            alert(response.data.message);
            this.fetchBrand()
          }
          else {
            alert(response.data.message);
          }
        });
    } else {
      swal('Error', `${this.state.message}`, 'error')
    }

  }

  deleteBrand(e) {
    swal({
      title: "Are you sure you want to Delete?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.post(URL + '/api/admin/deleteBrand', {
          brandId: e,
        }).then(res => {
          // swal("Proof! Your imaginary data has been deleted!",{
          //   icon:"success",
          // });
          return window.location = '/createBrand';
        })
        // setTimeout(function(){
        //   return window.location = '/createBrand';
        // },2000)
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }

  removeImage = () => {
    this.setState({
      brandImage: ''
    })
  }

  render() {
    const header = [
      { title: 'Brand', prop: 'brand', sortable: true, filterable: true },
      { title: 'Image', prop: 'image', sortable: false, filterable: false },
      { title: 'Action', prop: 'action', sortable: true, filterable: true },
    ];

    let state = this.state;
    const body = [];
    state.brandList.map((e, i) => {
      body.push({
        'brand': e.brandName,
        'image': <img src={e.file} alt="Brand--Thumbnail" style={{ width: '60px', height: '60px' }} />
        ,
        'action': <div className="actiontrans" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link to="#" onClick={() => this.toggle(e)}>
            <i className="fa fa-edit"></i>
          </Link>
          <Link to="#" onClick={this.deleteBrand.bind(this, e._id)}>
            <i className="fa fa-trash"></i>
          </Link>

        </div>
      });
    })
    //  console.log('Hello',body);
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
        {this.state.modal ? <EditBrand modal={this.state.modal} updateBrands={this.updateBrands} toggle={this.toggle} brand_data={this.state.brand_data} /> : null}
      </div>
    )
  }
}



export default BrandDataTable;