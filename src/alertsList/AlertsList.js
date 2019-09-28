import React from 'react';
import { connect } from 'react-redux';

import './alertsList.scss';


const AlertsList = ({ }) => {
	return (
		<p>Alerts list</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(AlertsList);
