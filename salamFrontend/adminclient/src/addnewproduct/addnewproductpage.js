import React from 'react';
import ReactDOM from 'react-dom';
import './addnewproductpage.css';
class Addnewproductpage extends React.Component{
	render()
	{
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Add  New Product</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Add  New Product</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-12">
                <form  method="post" className="card">
                  <div className="card-header">
                    <h3 className="card-title">Hi ! Admin Uopload Your New Product</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Select Category</label>
                          <select name="Category"  className="form-control custom-select">
                            <option >Select</option>
                            <option >Men Fashion</option>
                            <option >Women Fashion</option>
                            <option >Electronics</option>
                          </select>
                        </div>
                    </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Select Sub Category</label>
                          <select name="Category"  className="form-control custom-select">
                            <option >Select</option>
                            <option >T-shirt</option>
                            <option >Jeans</option>
                            <option >Shirt</option>
                          </select>
                        </div>
                    </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Product Name </label>
                          <input type="text" className="form-control" name="example-text-input"/>
                        </div>
                      </div>
                      <div className="col-md-2 col-lg-2">
                        <div className="form-group">
                          <label className="form-label">Product Price </label>
                          <input type="text" className="form-control" name="example-text-input"/>
                        </div>
                      </div>
                      <div className="col-md-2 col-lg-2">
                        <div className="form-group">
                          <label className="form-label">Total Quantity </label>
                          <input type="text" className="form-control" name="example-text-input"/>
                        </div>
                      </div>
                      <div className="col-md-2 col-lg-2">
                        <div className="form-group">
                          <label className="form-label">Total Discount </label>
                          <input type="text" className="form-control" name="example-text-input"/>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <label className="form-label">About Product </label>
                          <textarea className="form-control" name="example-textarea-input" rows="6" placeholder="text here.."></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
			)
	}
}

export default Addnewproductpage;