import { completeTask } from './tasksListModule';
import { BUILD_ITEM } from '../buildDialog/buildDialogModule';

const tasksListMiddleware = (store) => (next) => (action) => {
	const tasks = store.getState().tasks;
	const completed = tasks.filter((val) => val.progress >= 1);
	if (completed) {
		completed.map((val) => (
			// TODO: Un-Cory this?
			setTimeout(() => completeTask(val)(store.dispatch), 2)));
	}
	if (action.type === BUILD_ITEM) {
		// We got the ore?
		const ore = store.getState().ore;
		if (action.data.cost > ore) {
			return;
		}
	}
	return next(action);
};

export default tasksListMiddleware;
