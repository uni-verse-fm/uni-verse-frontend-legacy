import ModalHeader from "./ModalHeader";

const Modal = (props) => {
  return (
    props.showModal && (
      <div className="absolute justify-center items-center overflow-x-hidden overflow-y-auto h-2/3 bg-mdrk -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 w-2/3 border border-grn rounded-md">
        <ModalHeader handleCloseModal={props.handleCloseModal}>
          {props.customHeader}
        </ModalHeader>
        {props.children}
      </div>
    )
  );
};

export default Modal;
