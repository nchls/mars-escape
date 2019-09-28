import React from 'react';
import { connect } from 'react-redux';

import './roversList.scss';


const RoversList = ({ }) => {
	return (
		<p>Rovers list</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(RoversList);
