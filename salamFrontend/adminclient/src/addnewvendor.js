import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Addnewvendorpage from './addnewvendor/addnewvendorpage.js';
import Footer from './include/footer.js';
class Addnewvendor extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Addnewvendorpage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Addnewvendor;
