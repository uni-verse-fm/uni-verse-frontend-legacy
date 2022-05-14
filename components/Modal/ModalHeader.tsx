import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalHeader = ({ CustomHeader, handleCloseModal }) => {
  return (
    <div className="sticky top-0 bg-mdrk h-9 z-50">
      <button className="float-right mr-3 mt-1" onClick={handleCloseModal}>
        <FontAwesomeIcon icon={faXmark} className="bg-blk text-rd fa-xl" />
      </button>
      {CustomHeader && (<CustomHeader />)}
    </div>
  );
};

export default ModalHeader;
