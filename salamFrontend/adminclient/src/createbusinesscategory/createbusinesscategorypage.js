import React from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import './createbusinesscategorypage.css';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import action from '../action/action';
import BusinessDataTable from './BusinessDataTable';
const URL = process.env.REACT_APP_SERVER_URL;

class Createcategorypage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      businesscategory: { value: '', isValidate: true, message: '' },
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
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
    if (validator.isEmpty(state.businesscategory.value)) {
      state.businesscategory.isValidate = false;
      state.businesscategory.message = 'Category Can Not Be Blank';
      this.setState(state);
      return false;
    }
    // if (!state.businesscategory.value.match(/^[A-Za-z ]+$/)) {
    //   state.businesscategory.isValidate = false;
    //   state.businesscategory.message = "Must Be Letters";
    //   this.setState(state);
    //   return false;
    // }
    return true;
  }

  submit(event) {
    event.preventDefault();
    let isValid = this.validate();
    if (isValid) {
      let obj = {};
      obj.businesscategory = this.state['businesscategory'].value;
      console.log('RRRRRRRRRRRR', obj);
      axios.post(URL + '/api/admin/businessCategory', obj).then((response) => {
        console.log('LLLLLLLLLLLLLLLLLL', response);
        if (response.data.status === true) {
          swal("Successful",
            `${response.data.message}`,
          ).then((d) => {
            window.location = '/businesscategory'
          })
          if (response) {
            this.props.authenticate({
              type: 'authenticate',
              payload: response.data
            })
          }
        } else {
          swal("Error",
            `${response.data.message}`)
            .then((d) => {
              // return this.props.history.push('/businesscategory')
            })
        }
      })
    }
  }

  render() {
    const state = this.state;
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            {/* <h4 className="page-title">Create Business Category</h4> */}
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Create Business Category</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-4 col-lg-4">
              <form className="card" onSubmit={this.submit} >
                <div className="card-header">
                  <h3 className="card-title">Hi ! Admin Create Business Category</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-12">
                      <div className="form-group">
                        <label className="form-label">Category Name </label>
                        <input type="text" className="form-control" name="businesscategory" value={state.businesscategory.value} onChange={this.handleChange} />
                        <div style={{ fontSize: 13, color: 'red' }}>
                          {state.businesscategory.message}
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
                    <h2>Business Category List</h2>
                    <BusinessDataTable />
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

function mapStateToProps(state) {
  return {
    authenticateState: state.inititateState.authenticateState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: bindActionCreators(action.authenticate, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Createcategorypage));