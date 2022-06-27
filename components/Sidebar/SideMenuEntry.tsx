import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SideMenuEntryProps } from "../../common/types";

const SideMenuEntry = ({
  title,
  icon,
  onClick,
  nbNotif,
}: SideMenuEntryProps) => {
  return (
    <div
      className="flex w-full h-full justify-between text-wht cursor-pointer items-center p-4 hover:bg-gry hover:text-grn"
      onClick={onClick}
    >
      <a className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
        <FontAwesomeIcon icon={icon} className="mr-2" />
        <span className="text-sm ml-2">{title}</span>
      </a>
      {nbNotif && (
        <div className="py-1 px-3 bg-blck rounded flex items-center justify-center text-xs">
          {nbNotif}
        </div>
      )}
    </div>
  );
};

export default SideMenuEntry;
