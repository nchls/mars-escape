import React from 'react';
import { connect } from 'react-redux';

import './inventory.scss';


const Inventory = ({ }) => {
	return (
		<p>Inventory</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(Inventory);
