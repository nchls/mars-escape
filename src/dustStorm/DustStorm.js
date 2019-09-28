import React from 'react';
import { connect } from 'react-redux';

import './dustStorm.scss';


const DustStorm = ({ isDustStorm, timeSinceLastDustStorm }) => {
	return isDustStorm
		? (
			<div className="dustStorm-overlay">Dust storm! - {timeSinceLastDustStorm} Sols</div>
		)
		: null;
};

const mapStateToProps = ({ isDustStorm, timeSinceLastDustStorm }) => {
	return {
		isDustStorm,
		timeSinceLastDustStorm,
	};
};

export default connect(mapStateToProps)(DustStorm);
