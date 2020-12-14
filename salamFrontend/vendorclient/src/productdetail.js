import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Productdetailpage from './productdetail/productdetailpage.js';
import Footer from './include/footer.js';
class Productdetail extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Productdetailpage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Productdetail;
