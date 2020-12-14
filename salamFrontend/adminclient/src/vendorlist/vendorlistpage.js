import React from 'react';
import './vendorlistpage.css';
import DataTable from '../DataTable'

const Vendorlistpage = () => {
  return (
    <div className="my-3 my-md-5">
      <div className="container">
        <div className="page-header">
          <h4 className="page-title">Vendor List</h4>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Vendor List</li>
          </ol>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <DataTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vendorlistpage;