import { CardElement } from "@stripe/react-stripe-js";
import usePaymentForm from "./usePaymentForm";

export enum PaymentType {
  Donation = "donation",
  Purchase = "purchase",
}

const PaymentForm = ({ paymentType }) => {
  const { handleSubmit } = usePaymentForm();

  return (
    <form onSubmit={handleSubmit}>
      {paymentType === PaymentType.Donation && (
        <input
          type="number"
          className="h-10 w-10 mb-4 rounded-md border-2 border-grn text-center"
          min="1"
          max="999"
          placeholder="1"
        />
      )}

      <span className="ml-2 text-grn">Chose the amount to donate</span>
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
        <button className="text-lg font-medium rounded-md text-white bg-grn hover:bg-segrn px-4 mx-2">
          Pay
        </button>
      </div>
      <label className="text-grn mt-6">
        <input type="checkbox" className="accent-grn h-4 w-4 rounded-md" />
        <span className="ml-2">Save the card for future uses</span>
      </label>
    </form>
  );
};

export default PaymentForm;
