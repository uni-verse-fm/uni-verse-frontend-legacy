import Link from "next/link";
import UserDropDown from "./UserDropDown";

const HeaderLoginProfile = ({ user, isConnected }) => {
  return isConnected ? (
    <div className="fixed top-0 right-0 text-right">
      <UserDropDown user={user} />
    </div>
  ) : (
    <div className="flex mt-2">
      <div
        className={`text-lg font-medium rounded-md text-white bg-grn hover:bg-segrn h-8 px-4 mx-2`}
      >
        <Link href="/signUp "> Sign Up </Link>
      </div>
      <div
        className={`text-lg font-medium rounded-md text-white bg-grn hover:bg-segrn h-8 px-4 mx-2`}
      >
        <Link href="/login"> Login </Link>
      </div>
    </div>
  );
};

export default HeaderLoginProfile;
