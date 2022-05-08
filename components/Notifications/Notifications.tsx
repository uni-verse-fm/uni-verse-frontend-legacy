import { Toaster } from "react-hot-toast";

const Notifications = () => (
  <Toaster
    position="bottom-right"
    reverseOrder={false}
    gutter={25}
    toastOptions={{
      className:
        "bg-wht border-2 border-grn text-md font-medium rounded-md",
      success: {
        className:
          "bg-wht border-2 border-grn text-md font-medium rounded-md",
      },
      error: {
        className:
          "bg-wht border-2 border-rd text-md font-medium rounded-md",
      },
      loading: {
        className:
          "bg-wht border-2 border-gry text-md font-medium rounded-md",
      },
    }}
  />
);

export default Notifications;
