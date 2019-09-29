import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import './tasksList.scss';
import { orderTasks, cancelTask } from './tasksListModule';
import { openBuildDialog } from '../buildDialog/buildDialogModule';

import ProgressBar from '../progressBar/ProgressBar';
import { getItem } from '../data/items';

const Task = SortableElement(({ task, cancelTask }) => {
	const item = getItem(task.itemId);
	// The progressbar can't handle wonky fractional stuff
	let progress = parseFloat(((task.progress || 0) * 100).toFixed(2));
	// The progress bar also doesn't seem to handle values >100... but Math.min(progress, 100)
	// inside the progressbar didn't seem to work so ¯\_(ツ)_/¯
	if (progress > 100) { progress = 100; }
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a className="list-item" href="#">
			{item.name}
			<ProgressBar
				aria-label="Task progress"
				color="green"
				id={item.id}
				isVertical={false}
				progress={progress}
			/>
			<button className="button" onClick={() => cancelTask(task)}>Cancel</button>
		</a>
	);
});

const TasksContainer = SortableContainer(({ tasks, cancelTask }) => (
	<div className="list is-hoverable">
		{tasks.map((task, index) => <Task key={task.id} index={index} task={task} cancelTask={cancelTask} />)}
	</div>
));

class TasksList extends Component {
	constructor(props) {
		super(props);
		this.onSortEnd = this.onSortEnd.bind(this);
	}

	onSortEnd({ oldIndex, newIndex }) {
		const reorderedTasks = arrayMove(this.props.tasks, oldIndex, newIndex);
		this.props.orderTasks(reorderedTasks);
	}

	render() {
		const { tasks, cancelTask, openBuildDialog } = this.props;
		return (
			<>
				<h2 className="title is-5">Tasks</h2>
				{ tasks.length ? (
					<TasksContainer tasks={tasks} cancelTask={cancelTask} onSortEnd={this.onSortEnd} />
				) : null }
				<div className="buttons is-right">
					<button className="button is-primary" onClick={() => openBuildDialog('rover')}>Build Rover</button>
					<button className="button is-primary" onClick={() => openBuildDialog('module')}>Build Module</button>
				</div>
			</>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		tasks: state.tasks,
	};
};

const mapDispatchToProps = (dispatch) => ({
	orderTasks: (tasks) => orderTasks(tasks)(dispatch),
	cancelTask: (task) => cancelTask(task)(dispatch),
	openBuildDialog: (buildType) => openBuildDialog(buildType)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
