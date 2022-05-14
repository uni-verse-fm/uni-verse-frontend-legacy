import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import { useMutation } from "react-query";
import { donate, purchase } from "../../api/PaymentAPI";
import { Messages } from "../../common/constants";
import { NotificationType, notify } from "../Notifications";

const usePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const donateProps = useMutation("donate", donate, {
    onError: () => {
      notify(Messages.DONATION_ERROR, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(Messages.DONATION_ERROR, NotificationType.ERROR);
      } else {
        notify(Messages.DONATION_SUCCESS, NotificationType.SUCCESS);
      }
    },
  });

  const purchaseProps = useMutation("purchase", purchase, {
    onError: () => {
      notify(Messages.PURCHASE_ERROR, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(Messages.PURCHASE_ERROR, NotificationType.ERROR);
      } else {
        notify(Messages.PURCHASE_SUCCESS, NotificationType.SUCCESS);
      }
    },
  });

  const handleSubmitDonation = (amount: number) => async (event: FormEvent) => {
    event.preventDefault();

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      return;
    }

    const paymentMethodId = paymentMethod.id;

    donateProps.mutate({
      amount,
      paymentMethodId,
    });
  };

  const handleSubmitPayment =
    (amount: number, targetCustomerId: string, productId: string) =>
    async (event: FormEvent) => {
      event.preventDefault();

      const cardElement = elements?.getElement(CardElement);

      if (!stripe || !elements || !cardElement) {
        return;
      }

      const stripeResponse = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      const { error, paymentMethod } = stripeResponse;

      if (error || !paymentMethod) {
        return;
      }

      const paymentMethodId = paymentMethod.id;

      purchaseProps.mutate({
        paymentMethodId,
        targetCustomerId,
        productId,
        amount,
      });
    };

  return {
    handleSubmitDonation,
    handleSubmitPayment,
  };
};

export default usePaymentForm;
