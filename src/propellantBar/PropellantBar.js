import React from 'react';
import { connect } from 'react-redux';

import './propellantBar.scss';


const PropellantBar = ({ }) => {
	return (
		<p>Propellant bar</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(PropellantBar);
