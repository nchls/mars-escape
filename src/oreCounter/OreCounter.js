import React from 'react';
import { connect } from 'react-redux';

import './oreCounter.scss';


const OreCounter = ({ ore }) => {
	return (
		<>
			<strong>Ore:</strong> {ore}
		</>
	);
};

const mapStateToProps = ({ ore }) => {
	return {
		ore,
	};
};

export default connect(mapStateToProps)(OreCounter);
