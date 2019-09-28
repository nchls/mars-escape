import { RESTART_GAME } from '../app/appModule';
import { BUILD_ITEM } from '../buildDialog/buildDialogModule';
import { TICK } from '../slowTickins/tickinsModule';

export const CANCEL_TASK = 'CANCEL_TASK';

export const COMPLETE_TASK = 'COMPLETE_TASK';
const INCREMENT_TASK_PROGRESS = 'INCREMENT_TASK_PROGRESS';
const ORDER_TASKS = 'ORDER_TASKS';

const PROGRESS_CONSTANT = 0.1;

const initialState = Object.freeze([]);

export const cancelTask = (task) => (dispatch) => dispatch({ type: CANCEL_TASK, data: task });
export const completeTask = (task) => (dispatch) => dispatch({ type: COMPLETE_TASK, data: task });
export const orderTasks = (tasks) => (dispatch) => dispatch({ type: ORDER_TASKS, data: tasks });
export const incrementTaskProgress = (taskId) => (dispatch) => dispatch({ type: INCREMENT_TASK_PROGRESS, data: taskId });

const tasksListReducer = (state = initialState, { type, data }) => {
	switch (type) {
	case RESTART_GAME:
		return [...initialState];
	case BUILD_ITEM:
		return [...state, data];
	case CANCEL_TASK:
	case COMPLETE_TASK: // @TODO we need to update the inventory, not just remove the item
		return [...state.filter((val) => val.id !== data.id)];
	case INCREMENT_TASK_PROGRESS: {
		const index = state.findIndex((val) => val.id === data);
		const first = state.slice(0, index);
		const item = state.slice(index, index + 1);
		const end = state.slice(index + 1);
		const { progress = 0 } = item;
		return [...first, { ...item, progress: progress + PROGRESS_CONSTANT }, ...end];
	}
	case ORDER_TASKS:
		return [...data];
	case TICK: {
		const [first, ...rest] = state;
		if (first) {
			const { progress = 0 } = first;
			return [{ ...first, progress: progress + PROGRESS_CONSTANT }, ...rest];
		}
		return state;
	}
	default:
		return state;
	}
};

export default tasksListReducer;
