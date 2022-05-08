import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/Header";
import Notifications from "../components/Notifications";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-row bg-gry">
        <Sidebar />
        <div className="flex flex-col h-full w-full ">
          <Header />
          {/* Allows having that sweet rounded corner */}
          <div className="w-full h-full rounded-tl-md overflow-hidden">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
      <Notifications />
    </QueryClientProvider>
  );
}

export default MyApp;
