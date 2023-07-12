import ToastNotification from './ToastNotification';
import { useAppSelector } from '../stores/hooks';
import { Toast } from 'types/toast';

const ToastContainer = () => {
  const toasts: Toast[] = useAppSelector((state) => state.toasts.toasts);

  return (
    <div className="fixed bottom-10 z-50 right-0">
      <div className="max-w-xl mx-auto">
        {toasts &&
          toasts?.map((toast) => (
            <ToastNotification
              id={toast.id}
              key={toast.id}
              type={toast.type}
              delay={toast.delay}
              message={toast.message}
            />
          ))}
      </div>
    </div>
  );
};

export default ToastContainer;
