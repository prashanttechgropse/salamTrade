import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './include/header.js';
import Dashboardpage from './dashboard/dashboardpage.js';
import Footer from './include/footer.js';
class Dashboard extends Component {
      render() {
            return (
                  <div className="page" >
                        <div className="page-main" >
                              <Dashboardpage />
                        </div>
                        {/* <Footer /> */}
                  </div>
            );
      }
}
export default Dashboard;
