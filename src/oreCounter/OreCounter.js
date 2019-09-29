import React from 'react';
import { connect } from 'react-redux';

import './oreCounter.scss';


const OreCounter = ({ ore }) => {
	return (
		<div className="kv">
			<span className="key">Ore:&nbsp;</span>
			<span className="value">{ore}&nbsp;<i className="far fa-gem" /></span>
		</div>
	);
};

const mapStateToProps = ({ ore }) => {
	return {
		ore,
	};
};

export default connect(mapStateToProps)(OreCounter);
