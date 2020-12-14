import React from 'react';
import ReactDOM from 'react-dom';
import './footer.css';
class Footer extends React.Component{
	render()
	{
		return(


		   <footer className="footer salamfooter">
				<div className="container">
					<div className="row align-items-center flex-row-reverse">
						<div className="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
							Copyright © 2019 <a href="#">Salam Trades</a>. Designed by <a href="#">Techgropse</a> All rights reserved.
						</div>
					</div>
				</div>
			</footer>


			)

	}
}

export default Footer;