import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/Header";
import Notifications from "../components/Notifications";
import PlaylistsModal from "../components/PlayListsModal";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const queryClient = new QueryClient();
  const user = {
    email: "96abdou96@gmail.com",
    username: "96abdou96",
    avatar:
      "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
  };
  const isConnected = true;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-row bg-gry">
        <Sidebar isConnected={isConnected} handleShowModal={handleShowModal} />
        <div className="flex flex-col h-full w-full ">
          <Header user={user} isConnected={isConnected} />
          {/* Allows having that sweet rounded corner */}
          <div className="w-full h-full rounded-tl-md overflow-hidden">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
      <Notifications />
      {/** PlayLists Modal */}
      {showModal && (
        <div className="ModalPlayLists">
          <button
            style={{ float: "right", marginRight: "2%", marginTop: "1%" }}
            onClick={handleCloseModal}
          >
            {" "}
            <FontAwesomeIcon
              icon={faXmark}
              className="bg-blk text-rd"
            />
          </button>
          <PlaylistsModal />
        </div>
      )}
    </QueryClientProvider>
  );
}

export default MyApp;
