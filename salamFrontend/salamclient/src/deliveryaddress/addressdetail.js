import React from 'react';
import { withRouter } from 'react-router-dom'
import './addressdetail.css';
import validator from 'validator';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import $ from 'jquery';
const URL = process.env.REACT_APP_SERVER_URL;

var divStyle = {
  cursor:'pointer',
};

class Addressdetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            myAddress : [],
            isChecked:0,
            addressId:'',
            fullName :{value : '', isValidate : true , message : '' },
            mobile :{value : '', isValidate : true , message : '' },
            pincode :{value : '', isValidate : true , message : '' },
            address :{value : '', isValidate : true , message : '' },
            city :{value : '', isValidate : true , message : '' },
            state :{value : '', isValidate : true , message : '' },
            landmark :{value : '', isValidate : true , message : '' },
            alterNumber :{value : '', isValidate : true , message : '' },
        }
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
    }

    handleChangeFirstName(event){
      const {name,value} = event.target;
      let state = this.state;
      state[name].message = '';
      state[name].value = value;
      this.setState(state);
    }


    componentWillMount(){
      this.fetchMyAddress();
    }
    fetchMyAddress(){
      if(this.props.userId){
        axios.post(URL+'/api/user/getAddress',{
          userId:this.props.userId
        }).then((response)=>{
          this.setState({
            myAddress : response.data.getAddress,
          })
        })
      }else{
        swal({
          title: "OOPS",
          text: "Session expired.Please Login!",
          icon: "warning",
          dangerMode: true,
          closeOnClickOutside: false,
        }).then((d)=>{
            if(d){
            return window.location = "/Login"
          }
         })
      }
      
    }

    removeAddress = (addressId) => {
      axios.post(URL+'/api/user/deleteAddress',{
        addressId:addressId
      }).then((response)=>{
        if(response.data.code === 100){
          // return window.location.reload()
          this.fetchMyAddress();
        }else{
          swal({
            title: "OOPS",
            text: "Some error found.",
            icon: "warning",
            dangerMode: true,
            closeOnClickOutside: false,
          }).then((d)=>{
              if(d){
              //return window.location = "/Login"
            }
           })
        }
      })
    }
    selectAddress(addressId){
      this.setState({
        addressId:addressId
      });
      $(".addresss").removeClass('selectedAddress');
      $("#"+addressId).addClass('selectedAddress');
      // $(".rightsign").empty();
      // $("#"+addressId).html('<span>Selected</span>');
    }

    validate (){
      let state = this.state;
      if (validator.isEmpty(state.fullName.value)){
        state.fullName.isValidate = false;
        state.fullName.message = 'Full Name Is Required';
        this.setState(state);
        return false;
      }
      if(validator.isEmpty(state.mobile.value)){
        state.mobile.isValidate = false;
        state.mobile.message = 'Mobile Is Required';
        this.setState(state);
        return false;
      }
      if(!validator.isNumeric(state.mobile.value)){
        state.mobile.isValidate = false;
        state.mobile.message = 'Should be Number';
        this.setState(state);
        return false;
      }
      if(validator.isEmpty(state.pincode.value)){
        state.pincode.isValidate = false;
        state.pincode.message = 'Pincode Is Required';
        this.setState(state);
        return false;
      }
      if(!validator.isNumeric(state.pincode.value)){
        state.pincode.isValidate = false;
        state.pincode.message = 'Should be Number';
        this.setState(state);
        return false;
      }

      if (validator.isEmpty(state.address.value)){
        state.address.isValidate = false;
        state.address.message = 'Address Is Required';
        this.setState(state);
        return false;
      }
      if (validator.isEmpty(state.city.value)){
        state.city.isValidate = false;
        state.city.message = 'City Is Required';
        this.setState(state);
        return false;
      }
      if (validator.isEmpty(state.state.value)){
        state.state.isValidate = false;
        state.state.message = 'State Is Required';
        this.setState(state);
        return false;
      }
     return  true;
    }

    
    saveAddress(event){
      event.preventDefault();
      let isValid = this.validate();
      if(isValid){
        let obj = {}
        obj.userId=this.props.userId;
        obj.fullName = this.state['fullName'].value;
        obj.mobile =  this.state['mobile'].value;
        obj.pincode = this.state['pincode'].value;
        obj.address = this.state['address'].value;
        obj.city = this.state['city'].value;
        obj.state = this.state['state'].value; 
        obj.landmark = this.state['landmark'].value; 
        obj.alterNumber = this.state['alterNumber'].value; 
        
        axios.post(URL+'/api/user/addAddress',obj).then((response)=>{
          if(response.data.code === 100){
            swal({
              title: "Success!",
              text: response.data.message,
              icon: "success",
              dangerMode: false,
              closeOnClickOutside: false,
            }).then((d)=>{
             if(d){
               window.location.reload();
             }
            })

          }else {
            swal ("Error",
            `${response.data.message}`,
            "error",
            ).then((d)=>{
            })
          }
        })
      }
    }

	render()
	{
    const state = this.state;
		return(
        <section className="col-main col-sm-8  wow bounceInUp animated addressdeail-fluid">
          <div className="category-title">
               <h1>Delivery Address</h1>
            </div>
            <div className="showaddress">
              <div className="row">
              
                {
                  this.state.myAddress.map((e,i)=>{
                    // this.state.isChecked=this.state.isChecked+1;
                    return(
                      <div className="col-sm-6" onClick={() => this.selectAddress(e._id)}>
                        {/* <h4>Saved Address {this.state.isChecked}</h4> */}
                        <div className="addresss" id={e._id}>
                        <h2>{e.fullName}</h2>
                        <p>{e.address}</p>
                        <p>{e.city} , {e.state} ,{e.pincode}</p>
                        <p>Phone: <span>+{e.mobile}</span></p>
                        <div className="deleteaddress" style={divStyle}  onClick={() => this.removeAddress(e._id)}><i className="fa fa-close"></i></div>
                        {
                          this.state.isChecked===1 ?
                            <div className="rightsign"><i className="fa fa-check"></i></div>
                            :
                            <div className="rightsign" ></div>
                        }
                        
                        </div>
                      </div>
                    )
                    
                    })

                    }


              </div>
            </div>
            <div className="newaddress">
              <div className="category-title">
                 <h1>New Address</h1>
              </div>
              <div className="adaddress">
                  <form onSubmit = {this.saveAddress}>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" name="fullName" className="form-control"
                                  value = {state.fullName.value} onChange = {this.handleChangeFirstName}
                                 placeholder="Full Name" />
                                <div style={{ fontSize: 13, color: "red" }} >{state.fullName.message} </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="number" name="mobile" className="form-control" 
                                value = {state.mobile.value} onChange = {this.handleChangeFirstName}
                                placeholder="Mobile No" />
                                <div style={{ fontSize: 13, color: "red" }} >{state.mobile.message} </div>
                              </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="number" name="pincode" className="form-control"
                                value = {state.pincode.value} onChange = {this.handleChangeFirstName}
                                 placeholder="Pincode" />
                                 <div style={{ fontSize: 13, color: "red" }} >{state.pincode.message} </div>
                              </div>
                            </div>
                            {/* <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Locality" />
                              </div>
                            </div> */}
                            </div>
                            <div className="row">
                            <div className="col-sm-12">
                              <div className="form-group">
                                <textarea  name="address"  className="form-control"
                                 onChange = {this.handleChangeFirstName}
                                 placeholder="Address" >{state.pincode.value}</textarea>
                                 <div style={{ fontSize: 13, color: "red" }} >{state.address.message} </div>
                              </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" name="city" className="form-control"
                                value = {state.city.value} onChange = {this.handleChangeFirstName}
                                 placeholder="City/District" />
                                 <div style={{ fontSize: 13, color: "red" }} >{state.city.message} </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" name="state"
                                value = {state.state.value} onChange = {this.handleChangeFirstName}
                                 className="form-control" placeholder="State" />
                                 <div style={{ fontSize: 13, color: "red" }} >{state.state.message} </div>
                              </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" name="landmark" className="form-control"
                                value = {state.landmark.value} onChange = {this.handleChangeFirstName}
                                 placeholder="Landmark (Optional)" />
                                 <div style={{ fontSize: 13, color: "red" }} >{state.landmark.message} </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" name="alterNumber" className="form-control"
                                value = {state.alterNumber.value} onChange = {this.handleChangeFirstName}
                                 placeholder="Alternate Number (Optional)" />
                                 <div style={{ fontSize: 13, color: "red" }} >{state.alterNumber.message} </div>
                              </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-sm-4">
                              <button type="submit" name="submit" className="btn btn-primary saveforfuture" >Save Address</button>
                            </div>
                            {/* <div className="col-sm-4">
                              <button type="submit" name="submit" className="btn btn-primary deliver" >Deliver</button>
                            </div>
                            <div className="col-sm-4">
                              <button type="submit" name="submit" className="btn btn-primary cancell" >Cancel</button>
                            </div> */}
                          </div>
                      </form>
              </div>
            </div>
        </section>


			)
	}
}

function mapStateToProps(state){
   return{
      authenticateState : state.inititateState.authenticateState,
      email: state.inititateState.email,
      userId: state.inititateState.userId
   }
}

export default withRouter(connect(mapStateToProps)(Addressdetail));
