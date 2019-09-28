import React from 'react';
import { connect } from 'react-redux';

import './oreCounter.scss';


const OreCounter = ({ ore }) => {
	return (
		<React.Fragment>
			<strong>Ore:</strong> {ore}
		</React.Fragment>
	);
};

const mapStateToProps = ({ ore }) => {
	return {
		ore,
	};
};

export default connect(mapStateToProps)(OreCounter);
