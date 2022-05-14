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
    <header className="bg-gry grid grid-rows-1 grid-cols-6 gap-4 p-1 h-16 w-full col-start-1 col-span-2">
      <div className="overflow-hidden rounded-full">
        <Image
          src="/universe.svg"
          className="hover:motion-safe:animate-spin"
          alt="Uni-verse user avatar"
          width={60}
          height={60}
        />
      </div>
      <div className="mr-auto mt-auto mb-auto ml-auto flex xs:w-max w-full col-start-3 col-end-5">
        <div className="h-8 my-auto p-1 pl-2 bg-grn rounded-l-full">
          <FontAwesomeIcon icon={faSearch} className="text-white h-full" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full h-8 px-4 rounded-r-full text-black my-auto bg-white focus:ring-1 focus:ring-grn focus:outline-none focus:border-sky-500"
        />
      </div>
      <div className="flex flex-row-reverse col-start-6 col-end-7">
        <HeaderLoginProfile />
        <button
          className="text-md text-grn ml-3 border-2 border-grn rounded-full hover:border-white hover:text-white h-8 px-2 mx-2 mt-3"
          onClick={handleShowModal}
        >
          <FontAwesomeIcon
            icon={faHandHoldingDollar}
            className="text-grn fa-lg pr-2"
          />
          <span>Donate</span>
        </button>
      </div>
    </header>
  );
};
export default Header;
