import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between max-w-6xl items-center flex-wrap m-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-gray-500">Estatics</span>
          <span className="text-gray-800">World</span>
        </h1>
        <form className="flex items-center rounded-md bg-slate-100 p-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-gray-500" />
        </form>
        <ul className="flex gap-4">
          <Link
            to="/"
            className="hidden sm:inline text-slate-700 hover:underline active:text-lg active:text-green-500"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hidden sm:inline text-slate-700 hover:underline active:text-lg active:text-green-500"
          >
            About
          </Link>
          <Link
            to="/login"
            className=" text-slate-700 hover:underline active:text-lg active:text-green-500"
          >
            Sign in
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
