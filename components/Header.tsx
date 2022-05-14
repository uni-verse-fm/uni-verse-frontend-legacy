import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDonate,
  faHandHoldingDollar,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import HeaderLoginProfile from "./HeaderLoginProfile";
import Image from "next/image";

const Header = ({ handleShowModal }) => {
  return (
    <header className="bg-gry flex p-1 h-16 w-full">
      <div className="overflow-hidden rounded-full">
        <Image
          src="/universe.svg"
          className="hover:motion-safe:animate-spin"
          alt="Uni-verse user avatar"
          width={60}
          height={60}
        />
      </div>
      <div className="mr-auto mt-auto mb-auto ml-auto flex w-1/3 xs:w-max">
        <div className="h-8 my-auto p-1  bg-grn rounded-l-md">
          <FontAwesomeIcon icon={faSearch} className="text-white h-full" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-64 h-8 px-4 rounded-r-md text-black my-auto w-5/6 bg-white focus:ring-1 focus:ring-grn focus:outline-none focus:border-sky-500"
        />
      </div>
      <button
        className="text-lg text-grn ml-3 border-2 border-grn rounded-md hover:border-white hover:text-white h-8 px-2 mx-2 mt-3"
        onClick={handleShowModal}
      >
        <FontAwesomeIcon
          icon={faHandHoldingDollar}
          className="text-grn fa-lg pr-3"
        />
        donate
      </button>

      <HeaderLoginProfile />
    </header>
  );
};
export default Header;
