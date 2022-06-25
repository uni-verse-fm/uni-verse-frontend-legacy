import { imageSource } from "../../common/constants";
import Image from "next/image";

const UserRow = ({ user, onClickDisplayUser }) => {
  return (
    <div
      onClick={onClickDisplayUser(user)}
      className="hover:bg-grn cursor-pointer hover:bg-opacity-10 hover:text-lg text-md group items-center px-2 py-2 font-semibold text-gryf flex items-center justify-between"
    >
      <div className="flex items-center">
        <Image
          src={
            user.profilePicture
              ? imageSource + user.profilePicture
              : "/profile.jpg"
          }
          className="rounded-lg m-5"
          width={70}
          height={70}
          alt="User image"
        />
        <div className="m-4">{`${user.username} - ${user.email}`}</div>
      </div>
    </div>
  );
};

export default UserRow;
