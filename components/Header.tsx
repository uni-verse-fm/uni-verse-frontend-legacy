import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-gray-800 flex p-2 h-16 w-full">
      <div className="flex h-16 w-16 md:hidden sm:hidden">
        <img
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white ml-auto mb-auto mt-auto"
          src="https://picsum.photos/200/300"
          alt="Uni-verse logo"
        />
      </div>
      <div className="mr-auto mt-auto mb-auto sm:ml-auto md:ml-auto flex w-1/3">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-white m-auto"
        />
        <input
          type="text"
          placeholder="Search"
          className="ml-4 w-64 h-8 px-4 rounded-lg text-gray-700 m-auto w-5/6"
        />
      </div>
    <div className="text-white m-auto mr-5 sm:hidden md:hidden">
      Username
    </div>
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://picsum.photos/200/300"
        alt="Uni-verse user avatar"
      />
    </header>
  )
}
export default Header
