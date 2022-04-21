import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gry flex p-2 h-16 w-full text-grn">
      <div className="inline-block h-12 w-12 overflow-hidden rounded-full ring-2 ring-white hidden xs:block">
        <Image
          src="https://picsum.photos/200/300"
          alt="Uni-verse user avatar"
          width={48}
          height={48}
        />
      </div>
      <div className="mr-auto mt-auto mb-auto ml-auto flex w-1/3 xs:w-max">
        <FontAwesomeIcon icon={faSearch} className="text-grn m-auto" />
        <input
          type="text"
          placeholder="Search"
          className="ml-4 w-64 h-8 px-4 rounded-lg text-grn m-auto w-5/6 bg-wht border-2 border-grn"
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

      <div className="text-grn m-auto mr-5 xs:hidden">Username</div>
      <div className="inline-block h-12 w-12 overflow-hidden rounded-full ring-2 ring-grn">
        <Image
          src="https://picsum.photos/200/300"
          alt="Uni-verse user avatar"
          width={48}
          height={48}
        />
      </div>
    </header>
  );
};
export default Header;
