import toast from "react-hot-toast";
import { NotificationType } from ".";

const defaultPromiseMessage = {
  loading: "Loading",
  success: "Got the data",
  error: (err) => err.toString(),
};

export const notify = (
  message: string = "No message",
  toastType: NotificationType = NotificationType.DEFAULT,
  promise?: Promise<any>,
  promiseMesages: {
    success: string;
    error: string | ((err: any) => string);
    loading: string;
  } = defaultPromiseMessage
) => {
  switch (toastType) {
    case NotificationType.ERROR:
      toast.error(message);
      break;
    case NotificationType.SUCCESS:
      toast.success(message);
      break;
    case NotificationType.PROMISE:
      promise ? toast.promise(promise, promiseMesages) : toast(message);
      break;
    default:
      toast(message);
  }
};
