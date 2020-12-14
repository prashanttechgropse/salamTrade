import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Vendorlistpage from './vendorlist/vendorlistpage.js';
import Footer from './include/footer.js';
class Vendorlist extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Vendorlistpage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Vendorlist;
