type Toast = {
  id: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
  delay: number;
};

export type ToastPayloadObject = {
  toast: {
    type: ToastType;
    message: string;
  };
  delay?: number;
};

export enum ToastType {
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
}

export default Toast;
