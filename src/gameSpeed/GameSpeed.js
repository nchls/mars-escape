import React from 'react';
import { connect } from 'react-redux';

import './gameSpeed.scss';


const GameSpeed = ({ }) => {
	return (
		<p>Game speed</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(GameSpeed);
