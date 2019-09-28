import React from 'react';
import './progressBar.scss';

const ProgressBar = ({ progress }) => (
	<div className="progress-outer progress-vertical">
		<div
			aria-valuemax="100"
			aria-valuemin="0"
			aria-valuenow={progress}
			className={`progress-bar progress-tick-${progress}`}
			role="progressbar"
		/>
	</div>
);

export default ProgressBar;
