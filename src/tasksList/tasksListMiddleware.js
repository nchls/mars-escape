import { completeTask } from './tasksListModule';

const tasksListMiddleware = (store) => (next) => (action) => {
	const tasks = store.getState().tasks;
	const completed = tasks.filter((val) => val.progress >= 1);
	if (completed) {
		completed.map((val) => (
			// TODO: Un-Cory this?
			setTimeout(() => completeTask(val)(store.dispatch), 2)));
	}
	return next(action);
};

export default tasksListMiddleware;
