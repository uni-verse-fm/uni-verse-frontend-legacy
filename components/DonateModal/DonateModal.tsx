import Modal from "../Modal";
import PaymentFormWrapper from "./PaymentFormWrapper";

const DonateModal = ({ showModal, handleCloseModal }) => {
  return (
    <Modal
      showModal={showModal}
      handleCloseModal={handleCloseModal}
    >
      <PaymentFormWrapper />
    </Modal>
  );
};

export default DonateModal;
