import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentForm from "../PaymentForm";
import { PaymentType } from "../PaymentForm/PaymentForm";

const DonateModal = ({ showModal, handleCloseModal }) => {
  return (
    showModal && (
      <div className="absolute justify-center items-center overflow-x-hidden overflow-y-auto h-2/3 bg-mdrk -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 w-2/3 border-2 border-grn rounded-md">
        <div className="sticky top-0 bg-mdrk h-9 z-50">
          <button className="float-right mr-3 mt-1" onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faXmark} className="bg-blk text-rd fa-lg" />
          </button>
        </div>
        <div className="p-8">
          <div className="text-8xl text-grn m-8">Thank you for helping us</div>
          <div className="m-10 flex">
            <div className="w-full">
              <PaymentForm paymentType={PaymentType.Donation} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DonateModal;
