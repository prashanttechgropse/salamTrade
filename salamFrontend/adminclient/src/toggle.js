import React, { Component } from 'react'; 
import './toggle.scss';

class ToggleSwitches extends React.Component{
	constructor() {
		super();
		
		this.state = {
			checked: false
		};
		
		this.onToggleSwitchChange = this.onToggleSwitchChange.bind(this);
	}
	
	onToggleSwitchChange() {
		this.setState({
			checked: !this.state.checked
		});
	}
	
	render() {
		return (
			<div className='ToggleSwitch ToggleSwitch__rounded'>
				<div className='ToggleSwitch__wrapper'>
					<div className={`Slider ${this.state.checked && 'isChecked'}`} onClick={this.onToggleSwitchChange}></div>
				</div>
			</div>
		);
	}
}
export default ToggleSwitches;  
