import { completeTask } from './tasksListModule';

const tasksListMiddleware = (store) => (next) => (action) => {
	const tasks = store.getState().tasks;
	const completed = tasks.filter((val) => val.progress >= 1);
	if (completed) {
		completed.map((val) => completeTask(val));
	}
	return next(action);
};

export default tasksListMiddleware;
