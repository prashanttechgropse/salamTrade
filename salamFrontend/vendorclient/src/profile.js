import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Profilepage from './profile/profilepage.js';
import Footer from './include/footer.js';
class Profile extends Component
          {
	        render()
	              {
		             return(
                 <div className="page" >
                     <div className="page-main" >
                           <Header/>
                           <Profilepage/>
                      </div>
                     <Footer/>
                  </div>



			);
	}
}
export default Profile;
