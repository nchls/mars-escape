import React from 'react';
import { connect } from 'react-redux';

import './oreCounter.scss';


const OreCounter = ({ }) => {
	return (
		<p>Ore counter</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(OreCounter);
