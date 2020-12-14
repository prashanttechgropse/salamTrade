import React from 'react';
import ReactDOM from 'react-dom';
import './productlistpage.css';
import ProductDataTable from './productDataTable'
class Productlistpage extends React.Component {
  render() {
    return (
      <div className="my-3 my-md-5">
        <div className="container">
          <div className="page-header">
            <h4 className="page-title">Product List</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Product List</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <ProductDataTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    )
  }
}

export default Productlistpage;