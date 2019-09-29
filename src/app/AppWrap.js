import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BuildDialog from '../buildDialog/BuildDialog';
import GameSpeed from '../gameSpeed/GameSpeed';
import OreCounter from '../oreCounter/OreCounter';
import ElapsedTime from '../elapsedTime/ElapsedTime';
import PropellantBar from '../propellantBar/PropellantBar';
import TasksList from '../tasksList/TasksList';
import Inventory from '../inventory/Inventory';
import RoversList from '../roversList/RoversList';
import AlertsList from '../alertsList/AlertsList';
import EndGame from '../endGame/EndGame';
import DustStorm from '../dustStorm/DustStorm';
import Tutorial from '../tutorial/Tutorial';

import './app.scss';


const AppWrap = ({ gameOver, isBuildDialogOpen, isDustStorm, tutorialProgress, propellant }) => {
	return (
		<div className="app">
			<ToastContainer />
			{ !gameOver ? (
				<>
					<div className="top-bar">
						<header className="app-title">
							<h1 className="title is-4 over-storm">Mars Escape</h1>
						</header>
						<div className="top-controls-wrap">
							<div className="top-controls">
								<div className="elapsed-time over-storm">
									<ElapsedTime />
								</div>
								<div className="game-speed over-storm">
									<GameSpeed />
								</div>
								<div className="ore-counter over-storm">
									<OreCounter />
								</div>
							</div>
						</div>
					</div>
					{ (tutorialProgress < 99) && (
						<div className="tutorial boxed over-storm">
							<Tutorial />
						</div>
					) }
					<div className={`main${tutorialProgress < 99 ? ' tutorial-shown' : ''}`}>
						<div className="tasks-list boxed scrollable over-storm">
							<TasksList />
						</div>
						<div className="inventory boxed scrollable over-storm">
							<Inventory />
						</div>
						<div className="rovers-list boxed scrollable over-storm">
							<RoversList />
						</div>
						<div className="alerts boxed over-storm">
							<AlertsList />
						</div>
						<div className={`propellantBar boxed over-storm${propellant >= 1 ? ' launch-ready' : ''}`}>
							<PropellantBar />
						</div>
					</div>
					<BuildDialog buildType={isBuildDialogOpen} />
					{ isDustStorm && <DustStorm /> }
				</>
			) : (
				<EndGame />
			) }
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		gameOver: state.gameOver,
		isBuildDialogOpen: state.isBuildDialogOpen,
		isDustStorm: state.isDustStorm,
		tutorialProgress: state.tutorialProgress,
		propellant: state.propellant,
	};
};

export default connect(mapStateToProps)(AppWrap);
