import PaymentForm from "../PaymentForm";
import { PaymentType } from "../PaymentForm/PaymentForm";

const PaymentFormWrapper = () => {
  return (
    <div className="p-8">
      <div className="text-8xl text-grn m-8">Thank you for helping us</div>
      <div className="m-10 flex">
        <div className="w-full">
          <PaymentForm paymentType={PaymentType.Donation} />
        </div>
      </div>
    </div>
  );
};

export default PaymentFormWrapper;
