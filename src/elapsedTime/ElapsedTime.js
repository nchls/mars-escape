import React from 'react';
import { connect } from 'react-redux';

const ElapsedTime = ({ elapsedTime }) => {
	const converted = (elapsedTime / 100);
	return (
		<>
			<strong>Elapsed Time:</strong> {converted} Sols
		</>
	);
};

const mapStateToProps = ({ elapsedTime }) => {
	return {
		elapsedTime,
	};
};

export default connect(mapStateToProps)(ElapsedTime);
