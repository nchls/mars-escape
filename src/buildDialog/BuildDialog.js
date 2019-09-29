import React from 'react';
import { connect } from 'react-redux';

import './buildDialog.scss';
import { closeBuildDialog, buildItem } from './buildDialogModule';
import { getAllItems } from '../data/items';
import { makeNewTask } from '../tasksList/tasksListModule';

const sizeLabels = {
	1: 'Small',
	2: 'Medium',
	3: 'Large',
	4: 'Huge',
};

const Thingus = ({ item, buildItem, ore }) => {
	const disabled = item.cost > ore;
	return (
		<div className="build-item">
			<div className="left">
				<div className="item-name">{item.name}</div>
				<div className="item-description">{item.description}</div>
			</div>
			<div className="right">
				<button
					disabled={disabled}
					onClick={() => buildItem(item.cost, makeNewTask(item))}
					className="button is-primary"
				>
					{
						disabled
							? <>Not enough ore ({item.cost}&nbsp;<i className="far fa-gem" />)</>
							: <>Purchase ({item.cost}&nbsp;<i className="far fa-gem" />)</>
					}
				</button>
				<div className="item-weight kv">
					<span className="key">Weight:&nbsp;</span>
					<span className="value">{Math.floor(item.weight / 8)}kg</span>
				</div>
				{ item.minSize && (
					<div className="item-minsize kv">
						<span className="key">Min. rover size:&nbsp;</span>
						<span className="value">{sizeLabels[item.minSize]}</span>
					</div>
				) }
			</div>
		</div>
	);
};

const BuildAThingus = ({ isRover = false, buildItem, ore }) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<div>
			{getAllItems()
				.filter((item) => (isRover ? item.isRover : !item.isRover && !item.isStock))
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				.map((item) => <Thingus key={item.id} ore={ore} buildItem={buildItem} item={item} />)}
		</div>
	);
};

const BuildDialog = ({ buildType, closeBuildDialog, buildItem, ore }) => {
	const modalClass = `modal${buildType !== false ? ' is-active' : ''}`;
	return (
		<div className={modalClass}>
			<div className="modal-background" onClick={closeBuildDialog} />
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">Build a {buildType === 'rover' ? 'Rover' : 'Module'}</p>
					<button onClick={closeBuildDialog} className="delete" aria-label="close">Close</button>
				</header>
				<section className="modal-card-body">
					<BuildAThingus ore={ore} buildItem={buildItem} isRover={buildType === 'rover'} />
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
