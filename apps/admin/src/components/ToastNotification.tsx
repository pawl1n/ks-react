import Toast, { ToastType } from '../interfaces/Toast';
import { useAppDispatch } from '../stores/hooks';
import { removeToast } from '../stores/toastSlice';
import BaseIcon from './BaseIcon';
import { mdiCheckCircle, mdiCloseCircle } from '@mdi/js';

type ColorConfig = {
  [key in ToastType]: {
    bgColor: string;
    iconColor: string;
    messageColor: string;
    outline: string;
  };
};

const ToastNotification = ({ type, message, id, delay }: Toast) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(removeToast(id));
  };

  setTimeout(() => {
    dispatch(removeToast(id));
  }, delay);

  const buttonConfig: ColorConfig = {
    info: {
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-400',
      messageColor: 'text-blue-800',
      outline:
        'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-offset-blue-50 focus:ring-blue-600',
    },
    success: {
      bgColor: 'bg-green-50',
      iconColor: 'text-green-400',
      messageColor: 'text-green-800',
      outline:
        'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600',
    },
    danger: {
      bgColor: 'bg-red-50',
      iconColor: 'text-red-400',
      messageColor: 'text-red-800',
      outline:
        'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600',
    },
    warning: {
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-400',
      messageColor: 'text-orange-800',
      outline:
        'bg-orange-50 text-orange-500 hover:bg-orange-100 focus:ring-offset-orange-50 focus:ring-orange-600',
    },
  };

  return (
    <div>
      <div className={`rounded-md ${buttonConfig[type].bgColor} p-4 m-3`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <BaseIcon
              path={mdiCheckCircle}
              className={buttonConfig[type].iconColor}
            />
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium ${buttonConfig[type].messageColor}`}
            >
              {message}
            </p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={handleClick}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonConfig[type].outline}`}
              >
                <span className="sr-only">Dismiss</span>

                <BaseIcon className="h-5 w-5" path={mdiCloseCircle} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
