import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faDollarSign,
  faDownload,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { downloadResourcePack } from "../../api/ResourcePackAPI";
import { imageSource, Messages } from "../../common/constants";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import ConfirmDialogDelete from "../ConfirmDialogDelete";

import { useSession } from "next-auth/react";
import { isoDateToDateHour } from "../../utils/dateUtils";
import DisplayResourcesTable from "../DisplayResourcesTable";
import { useMutation } from "react-query";
import { donate, purchase } from "../../api/PaymentAPI";
import { notify } from "../Notifications";
import { NotificationType } from "../../common/types";

interface IResourcePack {
  resourcePack: any;
  download: boolean;
}
const ResourcePack = ({ resourcePack, download }: IResourcePack) => {
  const { data: session } = useSession();

  const [ShowMoreInformations, setShowMoreInformations] = useState(false);
  const handleShowMoreInformations = () => {
    setShowMoreInformations(true);
  };
  const handleCloseShowMoreInformations = () => setShowMoreInformations(false);
  const [showForm, setShowForm] = useState(false);
  const handleCloseDialog = () => setShowForm(false);

  const onDownloadResourcePack = async () => {
    let destId: string = undefined;
    if (resourcePack.accessType === "donation") destId = resourcePack._id;
    await downloadResourcePack(resourcePack._id, destId).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "universe.zip");
      document.body.appendChild(link);
      link.click();
    });
  };

  const purchaseMutation = useMutation(
    `purchace-${resourcePack._id}`,
    purchase,
    {
      onError: () => {
        notify(Messages.PURCHASE_ERROR, NotificationType.ERROR);
      },
      onSuccess: (res) => {
        if (res.status !== 201) {
          notify(Messages.PURCHASE_ERROR, NotificationType.ERROR);
        }
        window.location.href = res.data;
      },
    }
  );

  const donateMutation = useMutation(`donate-${resourcePack._id}`, donate, {
    onError: () => {
      notify(Messages.PURCHASE_ERROR, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(Messages.PURCHASE_ERROR, NotificationType.ERROR);
      }
    },
  });

  const onDonate = () => {
    donateMutation.mutate({
      amount: resourcePack.amount,
      donationProductId: resourcePack.user.donationProductId,
      connectedAccountId: resourcePack.author.stripeAccountId,
    });
  };

  const onPurchase = () => {
    purchaseMutation.mutate({
      productId: resourcePack.productId,
      connectedAccountId: resourcePack.author.stripeAccountId,
    });
  };

  return (
    <div>
      <div className="Global bg-grey w-full h-full flex flex-col">
        <>
          <div className="flex flex-row mb-10">
            <div className="flex flex-col gap-2">
              <img
                src={
                  resourcePack.coverName
                    ? imageSource + resourcePack.coverName
                    : "/Playlist.png"
                }
                className="rounded-xl h-48 w-48"
                alt="ResourcePack"
              />
              {!download && resourcePack.accessType === "donation" && (
                <div>
                  <h1 className="text-md text-grn text-center p-2 justify-self-center">
                    {resourcePack.amount}$ minimum <br /> donations
                  </h1>
                  <button className="" onClick={onDonate}>
                    <div className="flex flex-row items-center justify-center text-sm text-grn border-2 border-grn rounded-full hover:border-white hover:text-white h-8 px-2 py-auto">
                      <FontAwesomeIcon
                        icon={faHandHoldingDollar}
                        className="text-grn fa-lg pr-2"
                      />
                      <span className="font-bold">Donate</span>
                    </div>
                  </button>
                </div>
              )}
              {!download && resourcePack.accessType === "paid" && (
                <button className="w-full" onClick={onPurchase}>
                  <div className="flex flex-row items-center justify-center text-sm text-grn border-2 border-grn rounded-full hover:border-white hover:text-white h-8 px-2 py-auto">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="text-grn fa-lg pr-2"
                    />
                    <span className="font-bold">Buy</span>
                  </div>
                </button>
              )}
            </div>

            <div className="ml-5 ">
              <div className="flex flex-row gap-6 mb-1">
                <h2 className="text-grn text-xl font-bold ">
                  {download && (
                    <FontAwesomeIcon
                      className="cursor-pointer hover:scale-[1.40]  text-wht hover:text-grn"
                      icon={faDownload}
                      onClick={onDownloadResourcePack}
                    />
                  )}
                </h2>
                {(session?.user as any)?.id === resourcePack.author._id &&
                  resourcePack.accessType === "free" && (
                    <div className="flex flex-row">
                      <h2 className="text-grn text-xl">
                        <FontAwesomeIcon
                          className="cursor-pointer hover:scale-[1.40] hover:text-rd text-rd"
                          icon={faTrashCan}
                        />
                      </h2>
                    </div>
                  )}
              </div>

              <div className="flex flex-row ">
                <h2 className="text-grn text-2xl font-bold ">
                  {resourcePack.title}
                </h2>
              </div>

              {resourcePack?.author && (
                <h2 className="text-gry ">{resourcePack.author.username}</h2>
              )}
              {ShowMoreInformations == false ? (
                <h2 className="text-grn">
                  <FontAwesomeIcon
                    className="cursor-pointer hover:scale-[1.40] hover:text-grn text-wht"
                    icon={faChevronDown}
                    onClick={handleShowMoreInformations}
                  />
                </h2>
              ) : (
                <h2 className="text-grn">
                  <FontAwesomeIcon
                    className="cursor-pointer hover:scale-[1.40] hover:text-grn text-grn"
                    icon={faChevronUp}
                    onClick={handleCloseShowMoreInformations}
                  />
                </h2>
              )}

              {resourcePack?.description && ShowMoreInformations == true && (
                <>
                  <h2 className="text-wht ">{resourcePack.description}</h2>
                  <h2 className="text-gry text-xs">
                    Created at : {isoDateToDateHour(resourcePack.createdAt)}
                  </h2>
                </>
              )}
            </div>
          </div>
          {resourcePack.resources?.length > 0 ? (
            <DisplayResourcesTable
              resourcePack={resourcePack}
              download={download}
            />
          ) : (
            <div className="flex justify-center items-center mt-10 text-lg">
              <h1 className="text-grn whitespace-nowrap">
                {Messages.EMPTY_RESOURCES}
              </h1>
            </div>
          )}
        </>
        <ConfirmDialogDelete
          data-backdrop="static"
          data-keyboard="false"
          small={true}
          showModal={showForm}
          handleCloseDialog={handleCloseDialog}
          msg="Delete ResourcePack"
        />
      </div>
    </div>
  );
};
export default ResourcePack;
