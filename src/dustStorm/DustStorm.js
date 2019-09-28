import React from 'react';
import { connect } from 'react-redux';

import './dustStorm.scss';


const DustStorm = ({ }) => {
	return (
		<p>Dust storm!</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(DustStorm);
