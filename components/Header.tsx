import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gry flex p-2 h-16 w-full">
      <div className="mr-auto mt-auto mb-auto ml-auto flex w-1/3 xs:w-max">
        <FontAwesomeIcon icon={faSearch} className="text-grn m-auto" />
        <input
          type="text"
          placeholder="Search"
          className="ml-4 w-64 h-8 px-4 rounded-md text-blck m-auto w-5/6 bg-wht"
        />
      </div>
      <div className="text-wht ">
        <div className="m-auto text-grn ">
          <Link href="/signUp "> Sign Up </Link>
        </div>
        <div className="m-auto text-grn ">
          <Link href="/login"> Login </Link>
        </div>
      </div>
      <div className="flex">
        <h1 className="text-grn ml-auto mt-auto mb-auto mr-2 decoration-solid">
          username
        </h1>
        <div className="inline-block h-16 w-16 overflow-hidden rounded-full">
          <Image
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
            alt="Uni-verse user avatar"
            width={53}
            height={53}
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
