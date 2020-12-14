import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../include/header.js';
import Dashboardpage from './dashboardpage';
import Footer from '../include/footer.js';
class Dashboard extends Component {
      render() {
            return (
                  <div className="page" >
                        <div className="page-main" >
                              <Header />
                              <Dashboardpage />
                        </div>
                        <Footer />
                  </div>
            );
      }
}
export default Dashboard;
