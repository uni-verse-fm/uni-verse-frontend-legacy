import Link from "next/link";
import { useQuery } from "react-query";
import { reactQueryResponseHandler } from "../../api/APIUtils";
import { me } from "../../api/AuthAPI";
import { Pages } from "../../common/constants";
import useConnect from "../../common/providers/ConnectProvider";
import UserDropDown from "./UserDropDown";

const HeaderLoginProfile = () => {
  const [connect, setConnect] = useConnect();
  const { status, data } = useQuery(
    "me",
    () => me().then((res) => res.data),
    reactQueryResponseHandler(setConnect)
  );

  return connect ? (
    <UserDropDown user={data} />
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
