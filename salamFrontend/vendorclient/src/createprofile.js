import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Createprofilepage from './createprofile/createprofilepage.js';
import Footer from './include/footer.js';
class Createprofile extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Createprofilepage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Createprofile;
