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
        <div className="flex flex-col h-screen overflow-hidden">
          <div className="sticky top-0">
            <Header user={user} />
          </div>
          <div className="flex flex-grow h-full overflow-hidden">
            <div className="flex flex-row bg-gry w-full overflow-hidden">
              <Sidebar handleShowModal={handleShowModal} />
              <div className="flex flex-col h-full w-full ">
                {/* Allows having that sweet rounded corner */}
                <div className="w-full h-full rounded-tl-md overflow-hidden">
                  <Component {...pageProps} />
                </div>
              </div>
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
