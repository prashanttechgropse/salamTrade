import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from './header/search.js';
import Menu from './header/menu.js';
import axios from 'axios';
import { updateCartCount } from '../action/cart.action'
const URL = process.env.REACT_APP_SERVER_URL;

const Header = () => {
	const dispatch = useDispatch();
	const userId = useSelector(state => state.inititateState.userId);
	const [businesscategoryList, setBusinesscategoryList] = useState([]);

	useEffect(() => {
		axios.post(URL + '/api/user/fetchBusinesscategory', { userId }).then((response) => {
			if (response) {
				setBusinesscategoryList(response.data.data || []);
				dispatch(updateCartCount({ cartTotal: response.data.cartTotal }));
			}
		})
  }, []);
  console.log('---------------------')
	return (
		<div>
			<Search businesscategoryList={businesscategoryList} />
			<Menu businesscategoryList={businesscategoryList} />
		</div>
	)

}

export default Header;