import { cloneElement } from "react";
import ModalHeader from "./ModalHeader";

const Modal = (props) => {
  return (
    props.showModal && (
      <div
        className={`absolute top-0 left-0  ${
          props.small ? "w-1/3" : "w-2/3"
        } rounded-md`}
      >
        <div
          className={`relative flex items-center justify-center h-screen w-screen rounded-md z-10`}
        >
          <div
            className="absolute backdrop-blur-md h-screen w-screen top-0 left-0 -z-10"
            onClick={props.handleCloseModal}
          ></div>
          <div
            className={`bg-mdrk overflow-x-hidden overflow-y-auto h-2/3 ${
              props.small ? "w-1/3" : "w-2/3"
            }`}
          >
            <ModalHeader handleCloseModal={props.handleCloseModal}>
              {props.customHeader}
            </ModalHeader>
            {cloneElement(props.children, props.requirements || {})}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
