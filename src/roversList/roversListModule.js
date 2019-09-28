export const OPEN_ROVER_DETAIL = 'OPEN_ROVER_DETAIL';
export const openRoverDetail = (id) => (dispatch) => dispatch({ type: OPEN_ROVER_DETAIL, id: id });

export const CLOSE_ROVER_DETAIL = 'CLOSE_ROVER_DETAIL';
export const closeRoverDetail = () => (dispatch) => dispatch({ type: CLOSE_ROVER_DETAIL });

export const getDistinctEquippableParts = (inventory, rover) => {
	const parts = new Set();
	inventory.forEach((item) => {
		if (rover.modules.indexOf(item.itemId) === -1) {
			parts.add(item.itemId);
		}
	});
	return Array.from(parts);
};

export const roverDetailReducer = (state = null, action) => {
	switch (action.type) {
	case OPEN_ROVER_DETAIL:
		return action.id;
	case CLOSE_ROVER_DETAIL:
		return null;
	default:
		return state;
	}
};
