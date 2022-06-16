import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import { useMutation } from "react-query";
import { donate } from "../../api/PaymentAPI";
import { Messages } from "../../common/constants";
import { NotificationType } from "../../common/types";
import { notify } from "../Notifications";

const DonationAmount = {
  One: 100,
  Two: 200,
  Three: 300,
  Four: 400,
};

const DonateDropDown = () => {
  const { mutate } = useMutation("donate", donate, {
    onError: () => {
      notify(Messages.DONATION_ERROR, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(Messages.DONATION_ERROR, NotificationType.ERROR);
      } else {
        window.location.href = res.data.donateUrl;
        notify(Messages.DONATION_SUCCESS, NotificationType.SUCCESS);
      }
    },
  });

  return (
    <Menu as="div" className="text-left h-full w-auto text-right">
      <Menu.Button className="h-full p-2">
        <div className="right-0 text-md text-grn ml-3 border-2 border-grn rounded-full hover:border-white hover:text-white h-8 px-2 py-auto mx-2">
          <FontAwesomeIcon
            icon={faHandHoldingDollar}
            className="text-grn fa-lg pr-2"
          />
          <span className="font-bold">Donate</span>
        </div>
      </Menu.Button>
      <Menu.Items className="mt-2 w-36 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group flex w-full items-center px-2 py-2 text-sm`}
              onClick={() => mutate({ amount: DonationAmount.One })}
            >
              {`${DonationAmount.One / 100}$`}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group flex w-full items-center px-2 py-2 text-sm`}
              onClick={() => mutate({ amount: DonationAmount.Two })}
            >
              {`${DonationAmount.Two / 100}$`}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group flex w-full items-center px-2 py-2 text-sm`}
              onClick={() => mutate({ amount: DonationAmount.Three })}
            >
              {`${DonationAmount.Three / 100}$`}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-grn bg-opacity-25 text-md" : "text-sm"
              } group flex w-full items-center px-2 py-2 text-sm`}
              onClick={() => mutate({ amount: DonationAmount.Four })}
            >
              {`${DonationAmount.Four / 100}$`}
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default DonateDropDown;
