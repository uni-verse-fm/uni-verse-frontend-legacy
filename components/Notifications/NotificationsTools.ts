import toast from "react-hot-toast";
import { NotificationType } from ".";

export const notify = (
  message: string,
  toastType: NotificationType = NotificationType.DEFAULT
) => {
  switch (toastType) {
    case NotificationType.ERROR:
      toast.error(message);
      break;
    case NotificationType.SUCCESS:
      toast.success(message);
      break;
    case NotificationType.LOADING:
      toast.loading(message);
      break;
    default:
      toast(message);
  }
};
