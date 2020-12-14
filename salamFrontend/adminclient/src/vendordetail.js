import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Vendordetailpage from './vendordetail/vendordetailpage.js';
import Footer from './include/footer.js';
class Vendordetail extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Vendordetailpage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Vendordetail;
