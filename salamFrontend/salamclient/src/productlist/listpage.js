import React from 'react';

import './listpage.css';
// import Sidebar from './sidebar.js';
import List from './list.js';
class Listpage extends React.Component {
	render() {
		return (
			<div className="main-container col2-left-layout">
				<div className=" container">
					<div className="row">
						<List/>
						{/* <Sidebar/> */}
					</div>
				</div>
			</div>
		)
	}
}

export default Listpage;