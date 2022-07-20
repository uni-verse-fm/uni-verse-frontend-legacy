import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imageSource } from "../../common/constants";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import { Pages } from "../../common/types";

const ListContacts = ({ contacts }) => {
  const onClickDisplayMessages = (idContact) => () => {
    console.log("idContact");
    console.log(idContact);

    router.push({
      pathname: `/${Pages.UserMessages}`,
      query: { id: idContact },
    });
  };

  return (
    <table className="text-wht text-sm mb-5 rounded-lg bg-gry bg-opacity-50  ">
      <thead>
        <tr className="text-grn border-b mb-10 ">
          <td className="py-3 ">
            {" "}
            <h2 className="ml-3 "> My Contacts</h2>
          </td>
          <td className="py-3 ml-24 "></td>
        </tr>
      </thead>
      <tbody>
        {contacts?.map((contact, index) => (
          <tr
            key={`${contact?.username}-${index}`}
            className="h-10 hover:bg-gry hover:bg-opacity-70  "
          >
            <td className="cursor-pointer w-auto">
              <div
                className="flex flex-row  w-auto"
                onClick={onClickDisplayMessages(contact?.dest?._id)}
              >
                <img
                  src={
                    contact?.dest?.profilePicture
                      ? imageSource + contact?.dest?.profilePicture
                      : "/profile.jpg"
                  }
                  className="rounded-lg object-cover m-2"
                  width={50}
                  height={50}
                  alt="User cover"
                />
                <div className="flex flex-row items-center m-2 text-wht text-sm font-bold ">
                  <div className="mt-2 text-gryf text-sm">
                    {contact?.dest?.username}
                  </div>
                </div>
              </div>
            </td>
            <td className="cursor-pointer w-auto">
              <div className=" bg-opacity-30 bg-gry rounded-full  w-8 h-8 flex justify-center items-center hover:bg-opacity-100">
                <FontAwesomeIcon
                  className=" cursor-pointer hover:scale-[1.40] text-grn "
                  icon={faMessage}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListContacts;
