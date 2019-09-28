import React from 'react';
import './progressBar.scss';

const ProgressBar = ({
	'aria-label': ariaLabel,
	color,
	id,
	isVertical,
	progress,
}) => (
	<div className={`progress-outer ${isVertical ? 'progress-vertical' : 'progress-horizontal'}`}>
		<div
			aria-label={ariaLabel}
			aria-valuemax="100"
			aria-valuemin="0"
			aria-valuenow={progress}
			className={`progress-bar progress-tick-${progress} progress-${color}`}
			id={id}
		/>
	</div>
);

export default ProgressBar;
