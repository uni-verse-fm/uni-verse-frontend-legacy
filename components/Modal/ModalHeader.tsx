import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalHeader = (props) => {
  return (
    <div className="sticky top-0 bg-mdrk h-9 z-50">
      <button className="float-right mr-3 mt-1" onClick={props.handleCloseModal}>
        <FontAwesomeIcon icon={faXmark} className="bg-blk text-rd fa-xl" />
      </button>
      {props.children}
    </div>
  );
};

export default ModalHeader;
