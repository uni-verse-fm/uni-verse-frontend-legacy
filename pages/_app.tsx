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
import { PlayerProvider } from "../common/contexts/PlayerContext";
import { SessionProvider } from "next-auth/react";
import { AxiosProvider } from "../common/contexts/AxiosContext";
import { config } from "../config";
import Device from "../Device";

const stripePromise = loadStripe(config.stripePubKey);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showPlaylistsModal, setShowPlaylistsModal] = useState(false);
  const [createPlaylistIndex, setCreatePlaylistIndex] = useState(false);

  const handleShowPlaylistsModal = () => {
    setShowPlaylistsModal(true);
  };
  const handleShowCreatePlaylistIndex = () => setCreatePlaylistIndex(true);
  const handleHidecreatePlaylistIndex = () => setCreatePlaylistIndex(false);

  const queryClient = new QueryClient();

  const handleClosePlaylistsModal = () => {
    setShowPlaylistsModal(false);
    setCreatePlaylistIndex(false);
  };

  return (
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session}>
            <AxiosProvider adminRefreshToken={pageProps.adminRefreshToken}>
              <PlayerProvider>
                <Device>
                  {({ isMobile }) => {
                    if (isMobile)
                      return (
                        <div className="flex w-full h-full items-center justify-center text-grn text-xl">
                          <a
                            href="https://cloud.vagahbond.com/s/e8TwnLsirNyMtTo"
                            className="justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-grn hover:bg-segrn"
                          >
                            Dowload APK
                          </a>
                        </div>
                      );
                    return (
                      <div
                        className={
                          "flex flex-col h-screen w-screen overflow-hidden"
                        }
                      >
                        <div className="sticky top-0">
                          <Header />
                        </div>
                        <div className="flex flex-grow h-full overflow-hidden">
                          <div className="flex flex-row bg-gry w-full overflow-hidden">
                            <Sidebar
                              handleShowModal={handleShowPlaylistsModal}
                            />
                            <div className="flex flex-col h-full w-full ">
                              {/* Allows having that sweet rounded corner */}
                              <div className="w-full h-full rounded-tl-md overflow-hidden">
                                <Component {...pageProps} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Device>

                <Notifications />
                <PlaylistsModal
                  showModal={showPlaylistsModal}
                  handleCloseModal={handleClosePlaylistsModal}
                  createPlaylistIndex={createPlaylistIndex}
                  handleShowCreatePlaylistIndex={handleShowCreatePlaylistIndex}
                  handleHidecreatePlaylistIndex={handleHidecreatePlaylistIndex}
                />
              </PlayerProvider>
            </AxiosProvider>
          </SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Hydrate>
      </QueryClientProvider>
    </Elements>
  );
}

export default MyApp;
