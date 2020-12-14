import moment from 'moment'; // Example for onSort prop
import React, { Component } from 'react'; // Import React
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Datatable from 'react-bs-datatable'; // Import this package
import swal from 'sweetalert';
import validator from 'validator';
import Switch from 'react-switch';
import $ from 'jquery';
import './createbusinesscategorypage.css';
import './datatable.css';
import './business.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const URL = process.env.REACT_APP_SERVER_URL;

class BusinessDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessList: [],
      modal: false,
      businessId: '',
      businesscategory: '',
      // status : false,
      isChecked: null
    }
    this.fetchBusiness = this.fetchBusiness.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleBusinessCategoryChange = this.handleBusinessCategoryChange.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this._handleChange = this._handleChange.bind(this);

  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentWillMount() {
    this.fetchBusiness();

    this.setState({ isChecked: this.props.isChecked });
    console.log('ObjectChange', this.props.isChecked);
  }



  changeStatus(e, id, status, name) {
    console.log('ObjectChange', id + '/' + status + '/' + name);
    if (status == true || status == 'true') {
      status = false;
    } else {
      status = true;
    }
    const obj = {
      businessId: id,
      businesscategory: name,
      status: status,
    };

    axios.post(URL + '/api/admin/updateBusinessCategory/' + id, obj)
      .then(function (response) {
        console.log('response', response);
        if (response.data.status === true) {
          window.location = '/businesscategory';
        }
        else {
          alert(response.data.message);
        }
      });
  }


  // handleChange(e,status) {
  //   var arr = e;
  //   console.log('handlechange',arr);
  //   this.setState({ status : arr });
  //   let obj = {};
  //   obj.businesscategoryId = e;
  //   obj.status = !this.state.status;
  //   console.log('ObjectChange',obj);
  //   }

  // componentDidMount(){
  //   $(document).ready(function(){
  //     $(this).on('change',function(){
  //         if(this.checked){
  //           console.log('shivendra',this.checked);
  //           $(this).text(false);
  //         }
  //           else{
  //             $(this).text(true);
  //           }
  //       });
  //   });
  // }

  handleBusinessCategoryChange(event) {
    this.setState({
      businesscategory: event.target.value
    })
  }

  validate() {
    let state = this.state;
    if (validator.isEmpty(state.businesscategory.value)) {
      state.businesscategory.isValidate = false;
      state.businesscategory.message = 'Please Fill The Businee Category';
      this.setState(state);
      return false;
    }
    if (!state.productName.value.match(/^[A-Za-z ]+$/)) {
      state.productName.isValidate = false;
      state.productName.message = "Must Be Letters";
      this.setState(state);
      return false;
    }
    return true;
  }

  fetchBusiness() {
    axios.post(URL + '/api/admin/fetchBusiness').then((response) => {
      console.log('HHHHHHHHHHHHHHHHH', response);
      this.setState({
        businessList: response.data.doc
      })
    })
  }

  editBusinessCategory(e) {
    let that = this
    axios.get(URL + '/api/admin/editBusinessCategory/' + e)
      .then(response => {
        // console.log('???????????????/',response.data.businesscategory);
        this.setState({
          businessId: e,
          businesscategory: response.data.businesscategory,
        });
      })

    that.toggle()
  }

  updateBusinessCategory(e, id) {
    let that = this;
    e.preventDefault();
    console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;', this.state);
    const obj = {
      businessId: this.state.businessId,
      businesscategory: this.state.businesscategory,
      checked: this.state.isChecked,
    };
    console.log(']]]]]]]]]]]]]]]]]]]]]]]]]', obj);
    axios.post(URL + '/api/admin/updateBusinessCategory/' + this.state.businessId, obj)
      .then(function (response) {
        console.log('response', response);
        if (response.data.status === true) {
          alert(response.data.message);
          //window.location = '/businesscategory';
        }
        else {
          alert(response.data.message);
        }
      });
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
        axios.post(URL + '/api/admin/deleteBusinessCategory', {
          businessId: e,
        }).then(res => {
          swal("Delete Successfully", {
            icon: "success",
          });
        })
        setTimeout(function () {
          return window.location = '/businesscategory';
        }, 2000)
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  }

  render() {
    console.log('checked', this.state.isChecked);
    const header = [
      { title: 'Category', prop: 'category', sortable: true, filterable: true },
      { title: 'Status', prop: 'status', sortable: true, filterable: true },
      { title: 'Action', prop: 'action', sortable: true, filterable: true },
    ];

    let state = this.state;
    const body = [];
    state.businessList.map((e, i) => {
      var isCheck = '';
      if (e.status == true || e.status == 'true') {
        isCheck = "checked";
      } else {
        isCheck = "";
      }
      body.push({
        'category': e.businesscategory,
        'status':
          //      <label>
          //      <input ref="switch" value={ this.state.isChecked } onChange={ this._handleChange.bind(this,e._id) } className="switch" type="checkbox" />
          //      <div>
          //          <div></div>
          //      </div>
          //  </label>
          // <div className="card-options">
          //      <label className="custom-switch m-0">
          //        <input type="checkbox"  onChange={ this._handleChange.bind(this,e._id,this.state.isChecked) } className="custom-switch-input" />
          //        <span className="custom-switch-indicator"></span>
          //      </label>
          //    </div>
          <div>
            <label class="switch">
              <input id="on" type="checkbox" checked={isCheck} value={this.state.isChecked} onClick={() => this.changeStatus(this, e._id, e.status, e.businesscategory)} />
              <div class="slider round"></div>
            </label>
            <p id="info"></p>
          </div>
        ,
        'action': <div className="actiontrans" style={{ display: 'flex', justifyContent: 'space-evenly' }} >
          <Link to="#" onClick={this.toggle} onClick={this.editBusinessCategory.bind(this, e._id)}> <i className="fa fa-edit"></i> </Link>
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}></ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Business Category  </label>
                <input type="text" className="form-control" name="businesscategory" value={this.state.businesscategory} onChange={this.handleBusinessCategoryChange} />
              </div>
              <div className="form-group">

                <button onClick={this.updateBusinessCategory.bind(this)}>Update</button>
              </div>
              <div style={{ marginTop: 10 }}>

              </div>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
          </Modal>
          <Link to="#" onClick={this.deleteBusinessCat.bind(this, e._id)}  > <i className="fa fa-trash"></i></Link> </div>
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



export default BusinessDataTable;