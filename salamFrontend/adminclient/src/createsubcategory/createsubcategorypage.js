import React from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './createsubcategorypage.css';
import axios from 'axios';
import $ from 'jquery';
import swal from 'sweetalert';
import SubCategoryDataTable from './createsubcategoryDataTable'
const URL = process.env.REACT_APP_SERVER_URL;

class Createsubcategorypage extends React.Component{
  constructor(props){
		super(props);
		this.state = {
      subcategory :  {value :'', isValidate:true, message:''},
      businessList : [],
      businesscategory : {value :'', isValidate:true, message:''},
      categoryList : [],
      categoryId : {value:'', isValidate: true , message : ''},
		}
    this.handleChange = this.handleChange.bind(this);
    this.fetchBusinessCategory = this.fetchBusinessCategory.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);
		this.submit = this.submit.bind(this);
	}

  componentWillMount(){
    this.fetchBusinessCategory();
    this.fetchCategory();
  }


  fetchCategory(){
    axios.post(URL+'/api/admin/fetchcategory').then((response)=>{
      // console.log('666666666666666',response);
      this.setState({
        categoryList : response.data.category
      })
    })
  }
  
	handleChange(event){
		const {name,value} = event.target;
		let state = this.state;
		state[name].message = '';
		state[name].value = value;
		this.setState(state);
	}

	validate(){
    let state = this.state;
    if(validator.isEmpty(state.businesscategory.value)){
      state.businesscategory.isValidate = false;
      state.businesscategory.message = "BusinessCategory Can Not Be Blank";
      this.setState(state);
      return false;
    }
    if(validator.isEmpty(state.categoryId.value)){
      state.categoryId.isValidate = false;
      state.categoryId.message = "Category Can Not Be Blank";
      this.setState(state);
      return false;
    }
		if(validator.isEmpty(state.subcategory.value)){
			state.subcategory.isValidate = false;
			state.subcategory.message = 'Sub Category Can Not Be Blank';
			this.setState(state);
			return false;
    }
    // if (!state.subcategory.value.match(/^[A-Za-z ]+$/)) {
    //   state.subcategory.isValidate = false;
    //   state.subcategory.message = "Must Be Letters";
    //   this.setState(state);
    //   return false;
    // }
		return true;
	}


  fetchBusinessCategory(){
    axios.post(URL+'/api/admin/fetchBusiness').then((response)=>{
      console.log('HHHHHHHHHHHHHHHHH',response);
      this.setState({
        businessList : response.data.doc
      })
    })
  }

	submit(e){
    e.preventDefault();
		let isValid = this.validate();
		if(isValid){
      let obj = {};
      obj.subcategory = this.state['subcategory'].value;
      obj.businesscategory = this.state['businesscategory'].value;
      obj.categoryId = this.state['categoryId'].value;

      axios.post(URL+'/api/admin/SubCategory',obj).then((response)=>{
        console.log('LLLLLLLLLLLLLLLLLL',response);
        if(response.data.status === true){
          swal("Successful",
          `${response.data.message}`,
          ).then((d)=>{
            return window.location ="/subcategory"
          })
       
        }else{
          swal("Error",
          `${response.data.message}`,)
          .then((d)=>{
            // return this.props.history.push('/businesscategory')
          })
        }
      })
		}
  }

  handleSelect(e,i) {
    const{name,value} = e.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
    // this.setState({ businesscategory: e.target.value });
     let obj = {};
      obj.businesscategory = e.target.value
      console.log('resseeepeeppe',obj);
    axios.post(URL+'/api/admin/fetchCategory',obj).then((resp)=>{
      console.log('resseeepeeppe',resp.data.category);
      this.setState({
              categoryList :  resp.data.category
            })
    })
}

  

	render(e,i)	{
    const state = this.state;
    console.log('////////////////',this.state.businesscategory);
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              {/* <h4 className="page-title">Create Sub Category</h4> */}
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Create Sub Category</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-md-5 col-lg-5">
                <form  className="card" onSubmit = {this.submit}>
                  <div className="card-header">
                    <h3 className="card-title">Hi ! Admin Create Sub Category</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                        
                         <label className="form-label">Select Business Category</label>

                          <select name="Category" className="form-control custom-select" name = "businesscategory" value = {state.businesscategory.value}  onChange = {this.handleChange} onChange = {this.handleSelect.bind(this)} >  
                          <option value = '' hidden selected>Select</option>
                          {
                            this.state.businessList.map((e,i)=>{
                              return(
                              <React.Fragment key = {i}>
                            <option value = {e._id} >{e.businesscategory}</option>
                            </React.Fragment>
                              )
                            })
                          }
                          </select> 
                          <div style={{ fontSize: 13, color: "red" }}>
                           {state.businesscategory.message}
                          </div>                     
                        </div>
                    </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <label className="form-label">Category Name </label>
                          <select name="Category" className="form-control custom-select" name = "categoryId" value = {state.categoryId.value}  onChange = {this.handleChange} >  
                          <option value = '' hidden selected>Select</option>
                          {
                            this.state.categoryList.map((e,i)=>{
                              return(
                              <React.Fragment key = {i}>
                            <option value = {e._id} >{e.category}</option>
                            </React.Fragment>
                              )
                            })
                          }
                          </select> 
                          <div style={{ fontSize: 13, color: "red" }}>
                           {state.categoryId.message}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <label className="form-label">Sub Category Name </label>
                          <input type="text" className="form-control" name="subcategory" value = {state.subcategory.value} onChange = {this.handleChange} />
                          <div style = {{fontSize: 13, color: 'red'}}>
                            {state.subcategory.message}
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
                 <h2>Sub Category List</h2>
                   <SubCategoryDataTable/>
                  {/* <table id="example" className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="wd-15p">Sr. No</th>
                        <th className="wd-15p">Category</th>
                        <th className="wd-15p">Sub Category</th>
                        <th className="wd-20p">Status</th>
                        <th className="wd-25p">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Men Fashion</td>
                        <td>Jeans</td>
                         <td>
                        <div className="card-options">
                            <label className="custom-switch m-0">
                              <input type="checkbox" value="1" className="custom-switch-input" />
                              <span className="custom-switch-indicator"></span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="actiontrans">
                            <a href="#">Delete</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Women Fashion</td>
                        <td>T-Shirt</td>
                         <td>
                        <div className="card-options">
                            <label className="custom-switch m-0">
                              <input type="checkbox" value="1" className="custom-switch-input" />
                              <span className="custom-switch-indicator"></span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="actiontrans">
                            <a href="#">Delete</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Electronics</td>
                        <td>TV</td>
                         <td>
                        <div className="card-options">
                            <label className="custom-switch m-0">
                              <input type="checkbox" value="1" className="custom-switch-input" />
                              <span className="custom-switch-indicator"></span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="actiontrans">
                            <a href="#">Delete</a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              
              
               */}
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

function mapstateToProps(state){
  return{
    authenticateState : state.inititateState.authenticateState,
    businesscategory : state.inititateState.businesscategory,
    businessId : state.inititateState.businessId
  }
}

export default withRouter(connect(mapstateToProps)(Createsubcategorypage));