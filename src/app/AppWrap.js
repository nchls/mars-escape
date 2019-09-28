import React from 'react';
import { connect } from 'react-redux';

import BuildDialog from '../buildDialog/BuildDialog';
import GameSpeed from '../gameSpeed/GameSpeed';
import OreCounter from '../oreCounter/OreCounter';
import PropellantBar from '../propellantBar/PropellantBar';
import TasksList from '../tasksList/TasksList';
import Inventory from '../inventory/Inventory';
import RoversList from '../roversList/RoversList';
import AlertsList from '../alertsList/AlertsList';
import EndGame from '../endGame/EndGame';
import RoverDetail from '../roverDetail/RoverDetail';
import DustStorm from '../dustStorm/DustStorm';

import './app.scss';


const AppWrap = ({ gameOver, isBuildDialogOpen, roverDetail, isDustStorm }) => {
	return (
		<div className="app">
			{ !gameOver ? (
				<>
					<div className="top-bar">
						<header className="title">
							<h1>Escape From Mars</h1>
						</header>
						<div className="top-controls">
							<div className="game-speed">
								<GameSpeed />
							</div>
							<div className="ore-counter">
								<OreCounter />
							</div>
						</div>
					</div>
					<div className="main">
						<div className="tasks-list boxed scrollable">
							<TasksList />
						</div>
						<div className="inventory boxed scrollable">
							<Inventory />
						</div>
						<div className="rovers-list boxed scrollable">
							<RoversList />
						</div>
						<div className="alerts boxed">
							<AlertsList />
						</div>
						<div className="propellantBar boxed">
							<PropellantBar />
						</div>
					</div>
					{ isBuildDialogOpen && <BuildDialog /> }
					{ roverDetail !== undefined && <RoverDetail /> }
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
		roverDetail: state.roverDetail,
		isDustStorm: state.isDustStorm,
	};
};

export default connect(mapStateToProps)(AppWrap);
