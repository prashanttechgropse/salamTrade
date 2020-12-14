import React, { useEffect } from 'react';
import Sidebar from '../../component/Sidebar'
import './dashboard.css';

export default function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
      <div className="main-container col2-right-layout myorder-fluid">
        <div className="container">
          <div className="row">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}