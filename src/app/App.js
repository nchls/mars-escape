import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import BuildDialog from '../buildDialog/BuildDialog';
import GameSpeed from '../gameSpeed/GameSpeed';
import OreCounter from '../oreCounter/OreCounter';
import PropellantBar from '../propellantBar/PropellantBar';
import TasksList from '../tasksList/TasksList';
import Inventory from '../inventory/Inventory';
import RoversList from '../roversList/RoversList';
import AlertsList from '../alertsList/AlertsList';

import './app.scss';


const App = () => {
	return (
		<Provider store={store}>
			<div className="app">
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
					<div className="tasks-list boxed">
						<TasksList />
					</div>
					<div className="inventory boxed">
						<Inventory />
					</div>
					<div className="rovers-list boxed">
						<RoversList />
					</div>
					<div className="alerts boxed">
						<AlertsList />
					</div>
					<div className="propellantBar boxed">
						<PropellantBar />
					</div>
				</div>
			</div>
		</Provider>
	);
};

export default App;
