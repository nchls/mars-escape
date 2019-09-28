import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
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
						<GameSpeed />
						<OreCounter />
					</div>
				</div>
				<div className="main">
					<div className="tasks-list">
						<TasksList />
					</div>
					<div className="inventory">
						<Inventory />
					</div>
					<div className="rovers-list">
						<RoversList />
					</div>
					<div className="alerts">
						<AlertsList />
					</div>
					<div className="propellantBar">
						<PropellantBar />
					</div>
				</div>
			</div>
		</Provider>
	);
};

export default App;
