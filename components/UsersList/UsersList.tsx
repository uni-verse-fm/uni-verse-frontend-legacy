import { IFeat } from "../UploadListDisplayer/UploadListDisplayer";

interface IUsersList {
  data: IFeat[];
  onClick: (item: IFeat) => void;
}

const UsersList = (props?: IUsersList) => {
  return (
    <ul className="divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none m-2">
      {props.data.map((item, index) => (
        <li key={index}>
          <div
            key={index}
            className="flex text-white text-lg w-full text-sm group px-2 py-2 font-semibold text-gryf hover:bg-grn hover:bg-opacity-25 hover:text-xl"
            onClick={() => props.onClick(item)}
          >
            <div className="m-2">{item.username}</div>
            <div className="m-2">{item.email}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
