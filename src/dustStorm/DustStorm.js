import React from 'react';
import { connect } from 'react-redux';

import './dustStorm.scss';


const DustStorm = ({ isDustStorm }) => {
	return isDustStorm
		? (
			<div className="dustStorm-overlay" />
		)
		: null;
};

const mapStateToProps = ({ isDustStorm }) => {
	return {
		isDustStorm,
	};
};

export default connect(mapStateToProps)(DustStorm);
