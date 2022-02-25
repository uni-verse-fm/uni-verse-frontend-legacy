import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SideMenuEntryProps {
  title: string
  icon: any
  onClick: (event: any) => void
  nbNotif?: number
}

const SideMenuEntry = ({
  title,
  icon,
  onClick,
  nbNotif,
}: SideMenuEntryProps) => {
  return (
    <li className="flex w-full justify-between text-gray-400 cursor-pointer items-center mb-6">
      <a
        onClick={onClick}
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
      >
        <FontAwesomeIcon icon={icon} className="mr-2" />
        <span className="text-sm ml-2">{title}</span>
      </a>
      { nbNotif && (
        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">
          {nbNotif}
        </div>
      ) }
    </li>
  )
}

export default SideMenuEntry
