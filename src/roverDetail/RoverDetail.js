import React from 'react';
import { connect } from 'react-redux';

import './roverDetail.scss';


const RoverDetail = ({ }) => {
	return (
		<p>Rover detail</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(RoverDetail);
