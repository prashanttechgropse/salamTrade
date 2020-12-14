import React,{Component} from 'react';
import $ from 'jquery';

class Pass extends Component{
    componentDidMount(){
        $(".toggle-password").click(function() {

            $(this).toggleClass("fa-eye fa-eye-slash");
            var input = $($(this).attr("toggle"));
            if (input.attr("type") == "password") {
              input.attr("type", "text");
            } else {
              input.attr("type", "password");
            }
          });
    }
    render(){
        return(
            <div class="container">
          <div class="form-group">
            <label class="col-md-4 control-label">Password</label>
            <div class="col-md-6">
              <input id="password-field" type="password" class="form-control" name="password" value="secret"/>
              <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
            </div>
          </div>
</div>
        )
    }
}

export default Pass;