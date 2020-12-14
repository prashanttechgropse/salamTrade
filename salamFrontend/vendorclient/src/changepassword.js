import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import axios from 'axios';
import swal from 'sweetalert';
import './changepassword.css';
const URL = process.env.REACT_APP_SERVER_URL;

class Changepassword extends Component{
	constructor(props){
		super (props);
		this.state = {
			otp : {value : '', isValidate: true, message: ''},
			password : {value: '', isValidate: true, message: ''},
			cpassword: {value: '', isValidate: true, message: ''},
		}
		this.handleChangeOtp = this.handleChangeOtp.bind(this);
		this.saveNewPassword = this.saveNewPassword.bind(this);
	}

	handleChangeOtp(event){
		const {name,value} = event.target;
		let state = this.state;
		state[name].message = '';
		state[name].value = value;
		this.setState(state);
	}

	validate(){
		let state = this.state;
		if(validator.isEmpty(state.otp.value)){
			state.otp.isValidate = false;
			state.otp.message = "Please Fill The Otp";
			this.setState(state);
			return false;
		}
		if(validator.isEmpty(state.password.value)){
			state.password.isValidate = false;
			state.password.message = "Please Fill The Password";
			this.setState(state);
			return false;
		}
		if (!state.password.value.match(/^.*(?=.{8,15})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
			state.password.isValidate = false;
			state.password.message = "PassWord Should be 8 to 15 Character, One Capital letter, One Small letter, One Special character Required";
			this.setState(state);
			return false;
		  }
		if(validator.isEmpty(state.cpassword.value)){
			state.cpassword.isValidate = false;
			state.cpassword.message = "Please Fill The Confirm Password";
			this.setState(state);
			return false;
		}
		return true;
	}

	saveNewPassword(event){
		event.preventDefault();
		let isValid = this.validate();
		if(isValid){
			let obj = {};
			obj.otp = this.state['otp'].value;
			obj.password = this.state['password'].value;
			obj.cpassword = this.state['cpassword'].value;
			console.log('444444444444',obj);
			axios.post(URL+'/api/vendor/SavePassword',obj).then((response)=>{
				if(response.data.status === true){
					swal("Successful",
					`${response.data.message}`,
					"success",
					).then((d)=>{
						if(d){
							return window.location = "/"
						}
					})
				}else{
					swal("Error",
					`${response.data.message}`,
					"error",
					).then((d)=>{
						if(d){
							return window.location = "/Changepassword"
						}
					})
				}
			})
		}
	}

	render(){
		const state = this.state;
	   return(
		<div className="page forgotpasswordpage">
			<div className="page-single">
				<div className="container">
					<div className="row">
						<div className="col col-login mx-auto">
							<div className="text-center mb-6">
								<a href="#"><img src="./images/logo/logo.png" className="header-brand-img" alt="Salam Trades Logo"/></a>
							</div>
							<form className="card" onSubmit = {this.saveNewPassword}>
								<div className="card-body p-6">
									<div className="card-title text-center">Change Your Password</div>
									<div className="form-group">
										<label className="form-label">Otp</label>
										<input type="otp" className="form-control" id="exampleInputEmail1" name = "otp" value = {state.otp.value} onChange = {this.handleChangeOtp}  placeholder="Enter Otp"/>
										<div style={{ fontSize: 13, color: "red" }}>
											{state.otp.message}
										</div>
									</div>
									<div className="form-group">
										<label className="form-label">New Password</label>
										<input type="password" className="form-control" id="exampleInputEmail1" name = "password" value = {state.password.value} onChange = {this.handleChangeOtp}  placeholder="Enter Password"/>
										<div style={{ fontSize: 13, color: "red" }}>
											{state.password.message}
										</div>
									</div>
									<div className="form-group">
										<label className="form-label">Confirm Password</label>
										<input type="password" className="form-control" id="exampleInputEmail1" name =  "cpassword" value = {state.cpassword.value} onChange = {this.handleChangeOtp} placeholder="Enter Confirm Password"/>
										<div style={{ fontSize: 13, color: "red" }}>
											{state.cpassword.message}
										</div>
									</div>
									<div className="form-footer">
										<button type="submit" className="btn btn-primary btn-block loginbutton">Update</button>
									</div>
									<div className="text-center text-muted mt-3 signuptext">  Back to  <a href="/dashboard">Dashboard</a>  Click Here.  </div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>



			);
	}
}
export default Changepassword;
