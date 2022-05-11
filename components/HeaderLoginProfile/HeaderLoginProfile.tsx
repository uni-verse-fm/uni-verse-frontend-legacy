import Link from "next/link";
import { useQuery } from "react-query";
import { reactQueryResponseHandler } from "../../api/APIUtils";
import { me } from "../../api/AuthAPI";
import useConnect from "../../common/providers/ConnectProvider";
import UserDropDown from "./UserDropDown";

const HeaderLoginProfile = ({ user }) => {
  const [connect, setConnect] = useConnect();
  const { status, data } = useQuery(
    "me",
    () => me().then((res) => res.data),
    reactQueryResponseHandler(setConnect)
  );

  return connect && data ? (
    <UserDropDown user={data} />
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
