import { toast } from 'react-toastify';

const Toastify = (message, statusCode) => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    style: {
      background: "#1a1a1a",
      top: '72px',
      right: '20px'
    },
  };

  const showToast = (message) => {
    if (statusCode >= 200 && statusCode < 300) {
      toast.success(message, toastOptions);
    } else if (statusCode >= 300 && statusCode < 400) {
      toast.warning(message, toastOptions);
    } else if (statusCode >= 400) {
      toast.error(message, toastOptions);
    } else {
      toast.info(message, toastOptions);
    }
  };

  if (typeof message === 'string') {
    showToast(message);
  } else {
    Object.values(message).forEach(showToast);
  }
};

export default Toastify;
