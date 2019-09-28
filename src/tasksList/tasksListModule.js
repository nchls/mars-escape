import { RESTART_GAME } from '../app/appModule';
import { BUILD_ITEM } from '../buildDialog/buildDialogModule';
import { TICK } from '../slowTickins/tickinsModule';

const CANCEL_TASK = 'CANCEL_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';
const INCREMENT_TASK_PROGRESS = 'INCREMENT_TASK_PROGRESS';
const ORDER_TASKS = 'ORDER_TASKS';

const initialState = Object.freeze([]);

export const cancelTask = (taskId) => (dispatch) => dispatch({ type: CANCEL_TASK, data: taskId });
export const completeTask = (taskId) => (dispatch) => dispatch({ type: COMPLETE_TASK, data: taskId });
export const orderTasks = (tasks) => (dispatch) => dispatch({ type: ORDER_TASKS, data: tasks });
export const incrementTaskProgress = (taskId) => (dispatch) => dispatch({ type: INCREMENT_TASK_PROGRESS, data: taskId });

const tasksListReducer = (state = initialState, { type, data }) => {
	switch (type) {
	case RESTART_GAME:
		return [...initialState];
	case BUILD_ITEM:
		return [...state, data.task];
	case CANCEL_TASK:
		return [...state.filter((val) => val.id !== data)];
	case COMPLETE_TASK:
		return state; // @TODO
	case INCREMENT_TASK_PROGRESS:
		return state; // @TODO
	case ORDER_TASKS:
		return [...data];
	case TICK:
		return state; // @TODO
	default:
		return state;
	}
};

export default tasksListReducer;
