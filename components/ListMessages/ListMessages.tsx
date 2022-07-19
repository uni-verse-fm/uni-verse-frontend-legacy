import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { subMessage } from "../../utils/StrUtils";
import { useSession } from "next-auth/react";

const ListMessages = ({ messages }) => {
  const { data: session } = useSession();
  return (
    <table className="text-wht text-sm mb-5 rounded-lg bg-gry bg-opacity-50  ">
      <thead>
        <tr className="text-grn border-b mb-10 ">
          <td className="py-3 "></td>
          <td className="py-3 ml-24 ">
            <h2 className="ml-3 "> My Messages</h2>
          </td>
          <td className="py-3"></td>
        </tr>
      </thead>
      <tbody>
        {messages?.map((message, index) => (
          <tr
            key={`${message?.content}-${index}`}
            className="h-10 hover:bg-gry hover:bg-opacity-70  "
          >
            <td className="flex justify-center items-center mt-5 ">
              {(session?.user as any).id === message.user?._id ? (
                <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                  <FontAwesomeIcon className=" text-grn " icon={faUpLong} />
                </div>
              ) : (
                <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                  <FontAwesomeIcon className=" text-rd " icon={faDownLong} />
                </div>
              )}
            </td>
            <td className="cursor-pointer w-auto">
              <div className="flex flex-row  w-auto">
                <div className="flex flex-row items-center m-2 text-wht text-sm font-bold ">
                  <div className="mt-2 text-gryf text-sm">
                    {(session?.user as any).id === message?.user._id ? (
                      <div>To : {message?.dest?.username}</div>
                    ) : (
                      <div>From : {message?.user?.username}</div>
                    )}
                    {message?.createdAt}
                  </div>
                </div>
              </div>
            </td>
            <td>{subMessage(message?.content)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListMessages;
