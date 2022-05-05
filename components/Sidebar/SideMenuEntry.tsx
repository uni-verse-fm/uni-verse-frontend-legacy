import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Pages } from "./Index";

interface SideMenuEntryProps {
  title: string;
  icon: any;
  onClick: (event: any) => void;
  pageName?: Pages;
  nbNotif?: number;
}

const SideMenuEntry = ({
  title,
  icon,
  onClick,
  pageName,
  nbNotif,
}: SideMenuEntryProps) => {
  return (
    <div className="flex w-full h-full justify-between text-wht cursor-pointer items-center p-4 hover:bg-gry hover:text-grn">
      <a
        onClick={onClick}
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
      >
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {pageName ? (
            <Link href={`/${pageName}`}>
                <span className="text-sm ml-2">{title}</span>
            </Link>
            
        ) : <span className="text-sm ml-2">{title}</span>}
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
