import React from 'react';
import { connect } from 'react-redux';

import './buildDialog.scss';
import { closeBuildDialog, buildItem } from './buildDialogModule';
import { getAllItems } from '../data/items';
import { makeNewTask } from '../tasksList/tasksListModule';

const Thingus = ({ item, buildItem, ore }) => {
	const disabled = item.cost > ore;
	return (
		<div className="box" href="#">
			<h3 className="title is-3">{item.name}</h3>
			Description: {item.description}<br />
			Cost: {item.cost}<br />
			Weight: {item.weight}<br />
			<button
				disabled={disabled}
				onClick={() => buildItem(item.cost, makeNewTask(item))}
				className="button"
			>
				{disabled ? 'We Require More Minerals' : 'Purchase'}
			</button>
		</div>
	);
};

const BuildAThingus = ({ isRover = false, header, buildItem, ore }) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<div>
			<h2 className="title is-2">{header}</h2>
			{getAllItems()
				.filter((item) => (isRover ? item.isRover : !item.isRover && !item.isStock))
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				.map((item) => <Thingus key={item.id} ore={ore} buildItem={buildItem} item={item} />)}
		</div>
	);
};

const BuildDialog = ({ isOpen, closeBuildDialog, buildItem, ore }) => {
	const modalClass = `modal${isOpen ? ' is-active' : ''}`;
	return (
		<div className={modalClass}>
			<div className="modal-background" />
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">Build Something</p>
					<button onClick={closeBuildDialog} className="delete" aria-label="close">Close</button>
				</header>
				<section className="modal-card-body">
					<BuildAThingus ore={ore} buildItem={buildItem} isRover header="Rovers" />
					<BuildAThingus ore={ore} buildItem={buildItem} header="Modules" />
				</section>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		ore: state.ore,
	};
};

const mapDispatchToProps = (dispatch) => ({
	closeBuildDialog: () => closeBuildDialog()(dispatch),
	buildItem: (cost, task) => buildItem(cost, task)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildDialog);
