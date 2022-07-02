import { imageSource } from "../../common/constants";
import Image from "next/image";

const UserRow = ({ user, onClickDisplayUser }) => {
  return (
    <div
      onClick={onClickDisplayUser(user)}
      className="hover:bg-grn rounded-lg cursor-pointer hover:bg-opacity-10 hover:text-lg text-md group items-center p-2 font-semibold text-gryf flex items-center justify-between cursor-pointer"
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
        <div className="text-grn text-md m-4">
          <div className="text-drk text-xl">{user.username}</div>
          <div className="text-grn text-md">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserRow;
