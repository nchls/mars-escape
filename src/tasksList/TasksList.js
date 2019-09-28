import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import './tasksList.scss';
import { orderTasks } from './tasksListModule';

import { getItem } from '../data/items';

const Task = SortableElement(({ task }) => {
	const item = getItem(task.itemId);
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<a className="list-item" href="#">
			{item.name} | {task.progress}
		</a>
	);
});

const TasksContainer = SortableContainer(({ tasks }) => (
	<div className="list is-hoverable">
		{tasks.map((task, index) => <Task key={task.id} index={index} task={task} />)}
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
		const { tasks } = this.props;
		return (
			<>
				<p>Tasks list</p>
				<TasksContainer tasks={tasks} onSortEnd={this.onSortEnd} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
