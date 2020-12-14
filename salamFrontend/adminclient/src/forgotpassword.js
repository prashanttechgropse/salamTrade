import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './forgotpassword.css';
class Forgotpassword extends Component
          {
	        render()
	              {
		             return(

		<div className="page forgotpasswordpage">
			<div className="page-single">
				<div className="container">
					<div className="row">
						<div className="col col-login mx-auto">
							<div className="text-center mb-6">
								<a href="#"><img src="./images/logo/logo.png" className="header-brand-img" alt="Salam Trades Logo"/></a>
							</div>
							<form className="card">
								<div className="card-body p-6">
									<div className="card-title text-center">Vendor Login</div>
									<div className="form-group">
										<label className="form-label">Email address</label>
										<input type="email" className="form-control" id="exampleInputEmail1"  placeholder="Enter email"/>
									</div>
									<div className="form-footer">
										<button type="submit" className="btn btn-primary btn-block loginbutton">Send</button>
									</div>
									<div className="text-center text-muted mt-3 signuptext">  Forget it,  <a href="/">send me back</a>  to the sign in screen.  </div>
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
