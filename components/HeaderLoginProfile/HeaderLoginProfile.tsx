import { useSession } from "next-auth/react";
import Link from "next/link";
import { Pages } from "../../common/constants";
import UserDropDown from "./UserDropDown";

const HeaderLoginProfile = () => {
  const { data: session } = useSession();

  return session ? (
    <UserDropDown user={session?.user} />
  ) : (
    <div className="top-0 right-0 flex mt-3">
      <div
        className={`text-md font-medium rounded-full text-white bg-grn hover:bg-segrn h-8 px-3 mx-1 pt-1`}
      >
        <Link href="/SignUp ">Sign Up</Link>
      </div>
      <div
        className={`text-md font-medium rounded-full text-white bg-grn hover:bg-segrn h-8 px-3 mx-1 pt-1`}
      >
        <Link href={`/${Pages.Login}`}>Login</Link>
      </div>
    </div>
  );
};

export default HeaderLoginProfile;
