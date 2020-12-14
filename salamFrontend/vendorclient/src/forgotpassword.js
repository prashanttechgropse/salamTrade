import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import axios from 'axios';
import swal from 'sweetalert';
import { Link,  withRouter } from 'react-router-dom';
import './forgotpassword.css';
const URL = process.env.REACT_APP_SERVER_URL;
class Forgotpassword extends Component{
	constructor(props){
		super(props);
		this.state = {
			email : {value: '', isValidate: true, message: ''},
		}
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.forgetPassword  = this.forgetPassword.bind(this);
	}

	handleChangeEmail(event){
		const {name,value} = event.target;
		let state = this.state;
		state[name].message = '';
		state[name].value = value;
		this.setState(state);
	}

	validate(){
		let state = this.state;
		if(validator.isEmpty(state.email.value)){
			state.email.isValidate = false;
			state.email.message = "Please Fill The Email Address";
			this.setState(state);
			return false;
		}
		return true;
	}

	forgetPassword(event){
		event.preventDefault();	
		let isValid = this.validate();
		if(isValid){
			let obj = {};
			obj.email = this.state['email'].value;
			console.log('888888888888',obj);
			axios.post(URL+'/api/vendor/resetPassword',obj).then((response)=>{
				if(response.data.status === true){
					swal("Successful",
					`${response.data.message}`,
					"success",
					).then((d)=>{
						if(d){
							return this.props.history.replace('/');
						}
					})
				}else{
					swal("Error",
					`${response.data.message}`,
					"error",
					).then((d)=>{
						if(d){
							return this.props.history.replace('/Forgotpassword');
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
							<form className="card" onSubmit = {this.forgetPassword}>
								<div className="card-body p-6">
									<div className="card-title text-center">Vendor Login</div>
									<div className="form-group">
										<label className="form-label">Email address</label>
										<input type="email" className="form-control" id="exampleInputEmail1" name = "email" value = {state.email.value} onChange = {this.handleChangeEmail}  placeholder="Enter email"/>
										<div style={{ fontSize: 13, color: "red" }}>
											{state.email.message}
										</div>
									</div>
									<div className="form-footer">
										<button type="submit" className="btn btn-primary btn-block loginbutton">Send</button>
									</div>
									<div className="text-center text-muted mt-3 signuptext">  Forget it,  <Link to="/">send me back</Link>  to the sign in screen.  </div>
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
export default Forgotpassword;
