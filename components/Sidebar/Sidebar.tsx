import {
  faHome,
  faList,
  faRecordVinyl,
  faFileWaveform,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import SideMenuEntry from "./SideMenuEntry";
import Player from "../Player";
import { useSession } from "next-auth/react";
import { Pages } from "../../common/types";
import Link from "next/link";
import LinkWrapper from "./LinkWrapper";

const Sidebar = ({ handleShowModal }) => {
  const { data: session } = useSession();

  return (
    <div className="w-64 sm:relative bg-gry flex-col hidden sm:flex">
      <div className="mt-6 flex flex-col">
        <Link href={`/${Pages.Home}`} passHref>
          <SideMenuEntry icon={faHome} title="Home" />
        </Link>

        {!!session && (
          <>
            <SideMenuEntry
              icon={faList}
              onClick={handleShowModal}
              title="Playlists"
            />

            <Link href={`/${Pages.UploadRelease}`} passHref>
              <LinkWrapper>
                <SideMenuEntry icon={faRecordVinyl} title="Upload release" />
              </LinkWrapper>
            </Link>
            <Link href={`/${Pages.UploadResourcePack}`} passHref>
              <LinkWrapper>
                <SideMenuEntry
                  icon={faFileWaveform}
                  title="Upload sample or preset"
                />
              </LinkWrapper>
            </Link>
          </>
        )}
        <Link href={`/${Pages.LicencePage}`} passHref>
          <SideMenuEntry icon={faFile} title="Terms and conditions" />
        </Link>
      </div>
      <Player />
    </div>
  );
};

export default Sidebar;
