import React from 'react';
import ReactDOM from 'react-dom';
import './addnewvendorpage.css';
class Addnewvendorpage extends React.Component{
	render()
	{
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Add New Vendor</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Add New Vendor</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Hi Admin Please  Add a New Vendor</div>
                  </div>
                  <div className="card-body p-6">
                    <div className="wizard-container">
                      <div className="wizard-card m-0" id="wizardProfile">
                        <form>
                          <div className="wizard-navigation">
                            <ul>
                              <li><a href="#about" data-toggle="tab">About Vendor</a></li>
                              <li><a href="#business" data-toggle="tab">About Business</a></li>
                              <li><a href="#address" data-toggle="tab">Vendor Address</a></li>
                            </ul>
                          </div>

                          <div className="tab-content">
                            <div className="tab-pane" id="about">
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label">Your Name </label>
                                      <input name="Name" type="text" className="form-control" placeholder="Audu Maikori"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label">Your Email </label> <input name="Email" type="email" className="form-control" placeholder="audu@gmail.com"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label">Contact Number </label> <input name="Contact" type="text" className="form-control" placeholder=""/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label">Fax </label> <input name="Fax" type="text" className="form-control" placeholder=""/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label uploadprofile">Upload profile Image </label>
                                      <div className="custom-file">
                                        <input type="file" className="custom-file-input" name="example-file-input-custom"/>
                                        <label className="custom-file-label">Choose file</label>
                                      </div>
                                     </div>
                                   </div>
                                </div>

                              </div>
                            </div>
                            <div className="tab-pane" id="business">
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label">Business Name </label>
                                      <input name="Name" type="text" className="form-control" placeholder="Audu Maikori"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label">Business Email </label> <input name="Email" type="email" className="form-control" placeholder="audu@gmail.com"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label">Business Contact Number </label> <input name="Contact" type="text" className="form-control" placeholder=""/>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="input-group">
                                    <div className="form-group label-floating">
                                      <label className="control-label">Website  </label> <input name="Website" type="text" className="form-control" placeholder=""/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="tab-pane" id="address">
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group label-floating">
                                    <label className="control-label">Street Name</label>
                                    <input type="text" className="form-control"/>
                                  </div>
                                </div>
                                <div className="col-sm-3">
                                  <div className="form-group label-floating">
                                    <label className="control-label">Street Number</label>
                                    <input type="text" className="form-control"/>
                                  </div>
                                </div>
                                <div className="col-sm-3">
                                  <div className="form-group label-floating">
                                    <label className="control-label">Pin Number</label>
                                    <input type="text" className="form-control"/>
                                  </div>
                                </div>
                                <div className="col-sm-4 ">
                                  <div className="form-group label-floating">
                                    <label className="control-label">City</label>
                                    <input type="text" className="form-control"/>
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <div className="form-group label-floating">
                                    <label className="control-label">State</label>
                                    <select name="country" className="form-control">
                                      <option disabled="" value="..." selected="">select</option>
                                      <option value="Afghanistan"> Afghanistan </option>
                                      <option value="Albania"> Albania </option>
                                      <option value="Algeria"> Algeria </option>
                                      <option value="American Samoa"> American Samoa </option>
                                      <option value="Andorra"> Andorra </option>
                                      <option value="Angola"> Angola </option>
                                      <option value="Anguilla"> Anguilla </option>
                                      <option value="Antarctica"> Antarctica </option>
                                      <option value="...">...</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <div className="form-group label-floating">
                                    <label className="control-label">Country</label>
                                    <select name="country" className="form-control">
                                      <option disabled="" value="..." selected="">select</option>
                                      <option value="Afghanistan"> Afghanistan </option>
                                      <option value="Albania"> Albania </option>
                                      <option value="Algeria"> Algeria </option>
                                      <option value="American Samoa"> American Samoa </option>
                                      <option value="Andorra"> Andorra </option>
                                      <option value="Angola"> Angola </option>
                                      <option value="Anguilla"> Anguilla </option>
                                      <option value="Antarctica"> Antarctica </option>
                                      <option value="...">...</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="wizard-footer">
                            <div className="pull-right">
                              <input type='button' className='btn btn-next btn-fill btn-primary btn-wd m-0' name='next' value='Next' />
                              <input type='button' className='btn btn-finish btn-fill btn-success btn-wd m-0' name='finish' value='Finish' />
                            </div>
                            <div className="pull-left">
                              <input type='button' className='btn btn-previous btn-fill btn-default btn-wd m-0' name='previous' value='Previous' />
                            </div>
                            <div className="clearfix"></div>
                          </div>
                        </form>
                      </div>
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

export default Addnewvendorpage;