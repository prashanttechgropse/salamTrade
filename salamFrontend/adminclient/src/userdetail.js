import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Userdetailpage from './userdetail/userdetailpage.js';
import Footer from './include/footer.js';
class Userdetail extends Component {
      render() {
            return (
                  <div className="page" >
                        <div className="page-main" >
                              <Header />
                              <Userdetailpage />
                        </div>
                        <Footer />
                  </div>
            );
      }
}
export default Userdetail;
