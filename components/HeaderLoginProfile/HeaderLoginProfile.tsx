import Link from "next/link";
import useConnect from "../../common/providers/ConnectProvider";
import UserDropDown from "./UserDropDown";

const HeaderLoginProfile = ({ user }) => {
  const [connected] = useConnect();

  return connected ? (
    <UserDropDown user={user} />
  ) : (
    <div className="top-0 right-0 flex mt-3">
      <div
        className={`text-lg font-medium rounded-md text-white bg-grn hover:bg-segrn h-8 px-4 mx-2`}
      >
        <Link href="/signUp ">Sign Up</Link>
      </div>
      <div
        className={`text-lg font-medium rounded-md text-white bg-grn hover:bg-segrn h-8 px-4 mx-2`}
      >
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default HeaderLoginProfile;
