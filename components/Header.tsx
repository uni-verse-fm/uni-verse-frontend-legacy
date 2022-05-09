import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HeaderLoginProfile from "./HeaderLoginProfile";
import Image from "next/image";

const Header = ({ user }) => {
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
        <FontAwesomeIcon icon={faSearch} className="text-grn m-auto" />
        <input
          type="text"
          placeholder="Search"
          className="ml-4 w-64 h-8 px-4 rounded-md text-blck m-auto w-5/6 bg-wht"
        />
      </div>
      <HeaderLoginProfile user={user} />
    </header>
  );
};
export default Header;
