import { toast } from 'react-toastify';

/**
 * Display a success toast notification
 * @param {string} message - The message to display
 */
export const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

/**
 * Display an error toast notification
 * @param {string} message - The message to display
 */
export const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

/**
 * Display an info toast notification
 * @param {string} message - The message to display
 */
export const showInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 4000
  });
};

/**
 * Display a warning toast notification
 * @param {string} message - The message to display
 */
export const showWarning = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 4000
  });
};

/**
 * Handle API responses with appropriate toasts
 * @param {Object} result - API response
 * @param {string} successMessage - Custom success message
 * @param {string} errorMessage - Custom error message
 * @returns {boolean} - Whether operation was successful
 */
export const handleApiResponse = (
  result, 
  successMessage = "Operation successful!",
  errorMessage = "Operation failed"
) => {
  if (result && !result.error) {
    showSuccess(successMessage);
    return true;
  } else {
    const errorMsg = result?.error?.data?.message || errorMessage;
    showError(errorMsg);
    return false;
  }
};