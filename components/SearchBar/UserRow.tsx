import { imageSource } from "../../common/constants";

const UserRow = ({ user, onClickDisplayUser }) => {
  return (
    <div
      onClick={onClickDisplayUser(user)}
      className="hover:bg-grn rounded-lg cursor-pointer hover:bg-opacity-10 hover:text-lg text-md group items-center p-2 font-semibold text-gryf flex items-center justify-between cursor-pointer"
    >
      <div className="flex items-center">
        <img
          src={
            user.profilePicture
              ? imageSource + user.profilePicture
              : "/profile.jpg"
          }
          className="rounded-lg object-cover m-2 w-20 h-20"
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
