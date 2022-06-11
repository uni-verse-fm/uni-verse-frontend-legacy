import HeaderLoginProfile from "./HeaderLoginProfile";
import Image from "next/image";
import DonateDropDown from "./DonateDropDown";
import { useSession } from "next-auth/react";
import SearchBar from "./SearchBar";

const Header = () => {
  const { data: session } = useSession();

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
      <div className="w-full col-start-3 col-end-5">
        <SearchBar isConnected={session} />
      </div>
      <div className="flex flex-row-reverse col-start-6 col-end-7">
        <HeaderLoginProfile />
        {session && <DonateDropDown />}
      </div>
    </header>
  );
};
export default Header;
