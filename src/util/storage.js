export const setStorage = (key) => (undefinedValue) => (data) => {
	try {
		window.localStorage.setItem(key, JSON.stringify(data));
		return data;
	} catch (e) {
		return undefinedValue;
	}
};

export const getStorage = (key) => (undefinedValue) => () => {
	try {
		return JSON.parse(window.localStorage.getItem(key));
	} catch (e) {
		return undefinedValue;
	}
};
