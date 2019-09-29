import React from 'react';
import { connect } from 'react-redux';

import { setTutorialProgress } from './tutorialModule';
import './tutorial.scss';

const tutorials = [
	`
		Welcome to Escape From Mars. Your objective is to collect rocket propellant to get off the planet as quickly as
		possible by sending robotic rovers out to mine ice. You'll also need to collect ore for building new rovers
		and parts.
	`,
	`
		The list of rovers currently in your fleet is under "Rovers". You start with two small rovers that are equipped
		with parts for mining ice or ore, but they are currently waiting for instructions. Click on them to open the
		configuration view and give them a job.
	`,
	`
		You can buy new rovers and parts in the Build menu. Upgrade your rover with stronger motors, better
		drills, larger tanks, etc. to increase your resource collection. Once a part is finished building, you can equip
		it to any rover that's waiting in the garage.
	`,
	`
		Your rovers can get stuck in sand or lost, especially during periodic dust storms. If you want them back, you'll
		need to equip a rover with a rescue winch and set it to Rescue mode. It will automatically tow the
		incapacitated rover back to base and then wait in the garage for the next one.
	`,
	`
		Good luck!
	`,
];

const Tutorial = ({ tutorialProgress, setTutorialProgress }) => {
	if (tutorialProgress < 99 && tutorialProgress >= tutorials.length) {
		setTutorialProgress(99);
	}
	return (
		<>
			<p>{ tutorials[tutorialProgress] }</p>
			<div className="actions buttons is-right">
				<button className="button" onClick={() => setTutorialProgress(99)}>
					Dismiss tutorial
				</button>
				{ tutorialProgress < tutorials.length - 1 && (
					<button className="button is-primary" onClick={() => setTutorialProgress(tutorialProgress + 1)}>
						Next
					</button>
				) }
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		tutorialProgress: state.tutorialProgress,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setTutorialProgress: (tutorialId) => setTutorialProgress(tutorialId)(dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
