import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Addnewproductpage from './addnewproduct/addnewproductpage.js';
import Footer from './include/footer.js';
class Addnewproduct extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Addnewproductpage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Addnewproduct;
