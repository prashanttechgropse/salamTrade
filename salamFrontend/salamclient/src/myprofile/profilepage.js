import React from 'react';
import './profilepage.css';
import Sidebar from '../component/Sidebar';
import Profiledetail from './profiledetail.js';

class Profilepage extends React.Component {
  render() {
    return (
      <div className="main-container col2-right-layout myorder-fluid">
        <div className="container">
          <div className="row">
            <Sidebar pageSelected="myprofile" />
            <Profiledetail />
          </div>
        </div>
      </div>

    )
  }
}

export default Profilepage;