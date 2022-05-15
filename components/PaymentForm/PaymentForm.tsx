import { CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { IPurchase } from "../../api/PaymentAPI";
import useConnect from "../../common/providers/ConnectProvider";
import Counter from "./Counter";
import usePaymentForm from "./usePaymentForm";

export enum PaymentType {
  Donation = "donation",
  Purchase = "purchase",
}

export interface ICharge {
  paymentType: PaymentType;
  data?: IPurchase;
}

const PaymentForm = ({ paymentType, data }: ICharge) => {
  const { handleSubmitDonation, handleSubmitPayment } = usePaymentForm();
  const [donationAmount, setDonationAmount] = useState(1);
  const [saveCard, setSaveCard] = useState(false);
  const [connect] = useConnect();

  const handleSaveCard = (event: any) => {
    setSaveCard(!saveCard);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return paymentType === PaymentType.Donation
      ? handleSubmitDonation(donationAmount * 100, saveCard)(event)
      : handleSubmitPayment(
          data.amount * 100,
          data.targetCustomerId,
          data.productId,
          saveCard
        )(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      {paymentType === PaymentType.Donation && (
        <Counter amount={donationAmount} setAmount={setDonationAmount} />
      )}
      <div className="flex">
        <div className="border-2 rounded-md border-grn p-2 w-full">
          <CardElement
            options={{
              style: {
                base: {
                  color: "white",
                  iconColor: "white",
                  fontSize: "25px",
                  fontSmoothing: "antialiased",
                  ":-webkit-autofill": {
                    color: "gry",
                  },
                  "::placeholder": {
                    color: "gry",
                  },
                },
                invalid: {
                  iconColor: "rd",
                  color: "rd",
                },
              },
            }}
          />
        </div>
        {paymentType === PaymentType.Donation ? (
          <button className="text-lg font-medium rounded-md text-white bg-grn hover:bg-segrn px-4 mx-2">
            Donate
          </button>
        ) : (
          <button className="text-lg font-medium rounded-md text-white bg-grn hover:bg-segrn px-4 mx-2">
            Pay
          </button>
        )}
      </div>
      {connect && (
        <label className="text-grn mt-6">
          <input
            type="checkbox"
            className="accent-grn h-4 w-4 rounded-md"
            onChange={handleSaveCard}
            checked={saveCard}
          />
          <span className="ml-2">Save the card for future uses</span>
        </label>
      )}
    </form>
  );
};

export default PaymentForm;