import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "../components/Header";
import Notifications from "../components/Notifications";
import PlaylistsModal from "../components/PlayListsModal";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PlayerProvider } from "../common/providers/PlayerProvider";
import { SessionProvider } from "next-auth/react";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
const options = {
  clientSecret: process.env.STRIPE_CLIENT_SECRET,
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);
  const [createPlaylistIndex, setCreatePlaylistIndex] = useState(false);


  const handleShowPlaylistsModal = () => setShowPlaylistsModal(true);  
  const handleShowCreatePlaylistIndex = () => setCreatePlaylistIndex(true);
  const handleHidecreatePlaylistIndex = () => setCreatePlaylistIndex(false);

  const queryClient = new QueryClient();

  const handleClosePlaylistsModal = () => {
    setShowPlaylistsModal(false);
    setCreatePlaylistIndex(false);
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session}>
            <PlayerProvider>
              <div
                className={`${
                  showPlaylistsModal && "blur-md"
                } flex flex-col h-screen overflow-hidden`}
              >
                <div className="sticky top-0">
                  <Header />
                </div>
                <div className="flex flex-grow h-full overflow-hidden">
                  <div className="flex flex-row bg-gry w-full overflow-hidden">
                    <Sidebar handleShowModal={handleShowPlaylistsModal} />
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
                showModal={showPlaylistsModal}
                handleCloseModal={handleClosePlaylistsModal}
                createPlaylistIndex={createPlaylistIndex}
                handleShowCreatePlaylistIndex={handleShowCreatePlaylistIndex}
                handleHidecreatePlaylistIndex={handleHidecreatePlaylistIndex}
              />
            </PlayerProvider>
          </SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Hydrate>
      </QueryClientProvider>
    </Elements>
  );
}

export default MyApp;
