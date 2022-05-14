import ModalHeader from "./ModalHeader";

const Modal = ({ Component, CustomHeader, showModal, handleCloseModal }) => {
  return (
    showModal && (
      <div className="absolute justify-center items-center overflow-x-hidden overflow-y-auto h-2/3 bg-mdrk -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 w-2/3 border-2 border-grn rounded-md">
        <ModalHeader CustomHeader={CustomHeader} handleCloseModal={handleCloseModal} />
        {Component && <Component />}
      </div>
    )
  );
};

export default Modal;
