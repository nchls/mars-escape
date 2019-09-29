import { toast } from 'react-toastify';

export const showToast = (toastMessage,
	{ isSuccess = false, isFailure = false, isWarning = false }) => (
	toast(toastMessage, {
		position: 'top-right',
		autoClose: 2500,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		// eslint-disable-next-line
		className: `toast${isSuccess ? ' toast-success' : isFailure ? ' toast-failure' : isWarning ? ' toast-warning' : ''}`
	}));

export default showToast;
