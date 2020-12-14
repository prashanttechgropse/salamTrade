import React from 'react';
import BannerSlider from './home/slider';
import Categories from './home/categories.js';
import Favseller from './home/favseller.js';

const Home = () => {
	return (
		<div>
      <BannerSlider/>
			<Categories />
			<Favseller />
		</div>

	);
}
export default Home;
