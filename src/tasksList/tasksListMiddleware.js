import { completeTask } from './tasksListModule';
import { BUILD_ITEM } from '../buildDialog/buildDialogModule';

let oneAtATime = true;

const tasksListMiddleware = (store) => (next) => (action) => {
	const tasks = store.getState().tasks;
	const completed = tasks.find((val) => val.progress >= 1);
	if (completed && oneAtATime) {
		oneAtATime = false;
		// @TODO Made way worse, but with less bugs ???
		setTimeout(() => {
			completeTask(completed)(store.dispatch);
			oneAtATime = true;
		}, 0);
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
