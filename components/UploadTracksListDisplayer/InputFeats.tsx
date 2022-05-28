import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "react-query";
import { reactQueryResponseHandler } from "../../api/APIUtils";
import { searchUsers } from "../../api/UserAPI";
import { Messages } from "../../common/constants";
import useConnect from "../../common/providers/ConnectProvider";
import Modal from "../Modal";
import Spinner from "../Spinner";
import UsersList from "../UsersList";
import { IFeat, ITrack } from "./UploadTracksListDisplayer";

const SearchBar = ({ onChange }) => {
  return (
    <div className="flex xs:w-max w-full justify-center m-2">
      <div className="h-8 p-1 pl-2 bg-grn rounded-l-full">
        <FontAwesomeIcon icon={faSearch} className="text-white h-full" />
      </div>
      <input
        type="text"
        placeholder="Search"
        className="h-8 px-4 rounded-r-full text-black my-auto bg-white focus:ring-1 focus:ring-grn focus:outline-none focus:border-sky-500"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface IFeatChange {
  handleAddFeat: (feat: IFeat) => void;
  handleDeleteFeat: (index: number) => void;
  track: ITrack;
}

export const InputFeats = (props: IFeatChange) => {
  const [connect, setConnect] = useConnect();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { status, data } = useQuery(
    ["searchUsers", searchText],
    ({ signal }) => searchUsers(searchText, { signal }),
    {
      enabled: Boolean(searchText),
      ...reactQueryResponseHandler(setConnect),
    }
  );

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="flex overflow-x-scroll py-2 no-scrollbar h-full border-2 rounded-full m-auto w-96 my-1 bg-opacity-20">
      <div
        className="text-gry hover:text-wht hover:bg-segrn bg-blur-sm rounded-full bg-grn ml-2"
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-[1.40] text-wht mx-2 "
          icon={faPlus}
        />
      </div>
      <div className="flex flex-nowrap ">
        {props.track?.feats?.length !== 0 &&
          props.track.feats.map((feat, index) => (
            <div key={index} className="inline-block px-1">
              <label
                key={index}
                className="w-fit h-6 max-w-xs overflow-hidden rounded-lg font-semibold shadow-md bg-white hover:shadow-xl transition-shadow duration-300 px-2 ease-in-out"
                onClick={() => props.handleDeleteFeat(index)}
              >
                {feat.username}
              </label>
            </div>
          ))}
      </div>
      <Modal
        small={true}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        customHeader={<SearchBar onChange={setSearchText} />}
      >
        {status === "loading" ? (
          <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-full">
            <Spinner />
          </div>
        ) : status === "error" ? (
          <div className="absolute -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 grid place-content-center h-full">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : status === "success" ? (
          <UsersList onClick={props.handleAddFeat} data={data} />
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};
