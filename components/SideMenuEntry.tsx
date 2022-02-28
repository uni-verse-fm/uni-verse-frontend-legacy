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
    <div className="flex w-full h-full justify-between text-gray-400 cursor-pointer items-center p-4 hover:bg-gray-600">
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
    </div>
  )
}

export default SideMenuEntry
