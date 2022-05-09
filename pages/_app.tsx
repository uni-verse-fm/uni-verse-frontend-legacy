import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConnectProvider } from "../common/providers/ConnectProvider";
import Header from "../components/Header";
import Notifications from "../components/Notifications";
import PlaylistsModal from "../components/PlayListsModal";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

const user = {
  email: "96abdou96@gmail.com",
  username: "96abdou96",
  avatar: "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
};

function MyApp({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectProvider>
        <div className="h-screen flex flex-row bg-gry">
          <Sidebar handleShowModal={handleShowModal} />
          <div className="flex flex-col h-full w-full ">
            <Header user={user} />
            {/* Allows having that sweet rounded corner */}
            <div className="w-full h-full rounded-tl-md overflow-hidden">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
        <Notifications />
        <PlaylistsModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      </ConnectProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
