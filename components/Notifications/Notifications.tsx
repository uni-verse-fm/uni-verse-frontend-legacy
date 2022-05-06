import { Toaster, useToaster } from "react-hot-toast";

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts.map((toast) => {
        return (
          <Toaster
            key={toast.id}
            position="bottom-right"
            reverseOrder={false}
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
      })}
    </div>
  );
};

export default Notifications;
