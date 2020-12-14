import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Userlistpage from './userlist/userlistpage.js';
import Footer from './include/footer.js';
class Userlist extends Component {
      render() {
            return (
                  <div className="page" >
                        <div className="page-main" >
                              {/* <Header /> */}
                              <Userlistpage />
                        </div>
                        {/* <Footer /> */}
                  </div>



            );
      }
}
export default Userlist;
