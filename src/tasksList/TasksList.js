import React from 'react';
import { connect } from 'react-redux';

import './tasksList.scss';


const TasksList = ({ }) => {
	return (
		<p>Tasks list</p>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};

export default connect(mapStateToProps)(TasksList);
