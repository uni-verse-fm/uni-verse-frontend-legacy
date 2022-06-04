import { AxiosError } from "axios";
import router from "next/router";
import { Messages, Pages } from "../common/constants";
import { NotificationType, notify } from "../components/Notifications";

export const reactQueryResponseHandler = () => ({
  onSuccess: (res) => {
    if (res.status === 401) {
      notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
      router.replace(`/${Pages.Login}`);
    }
  },
  onError: (error: AxiosError) => {
    if (error.response?.status === 401) {
      notify(Messages.UNAUTHORIZED, NotificationType.ERROR);
      router.replace(`/${Pages.Login}`);
    }
  },
});
