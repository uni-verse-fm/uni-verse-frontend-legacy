import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <header className="bg-black flex p-2">
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://picsum.photos/200/300"
        alt="Uni-verse logo"
      />
      <h1 className="text-white m-auto ml-5">Uni-verse</h1>
      <div className="m-auto flex">
        <FontAwesomeIcon icon={faSearch} className="text-white m-auto" />
        <input
          type="text"
          placeholder="Search"
          className="ml-4 w-64 h-8 px-4 rounded-lg text-gray-700 m-auto"
        />
      </div>

      <p className="text-white m-auto mr-5">Username</p>
      <img
        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
        src="https://picsum.photos/200/300"
        alt="Uni-verse logo"
      />
    </header>
  )
}
export default Header
