import {FaSearch} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const Header = () => {
  const {currentUser} = useSelector (state => state.user);
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
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:border hover:p-1 hover:border-pink-700 hover:border-spacing-1 focus:underline-offset-0 focus:text-lg focus:text-green-500">
              {' '}Home
            </li>

          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:border hover:p-1 hover:border-pink-700 hover:border-spacing-1 focus:underline-offset-0 focus:text-lg focus:text-green-500">
              {' '}About
            </li>

          </Link>
          <Link to="/profile">
            {currentUser
              ? <img src={currentUser.avatar   } alt="profile" className='rounded-full w-7 h-7 object-cover'/>
              : <li className="hidden sm:inline text-slate-700 hover:border hover:p-1 hover:border-pink-700 hover:border-spacing-1 focus:underline-offset-0 focus:text-lg focus:text-green-500">
                  {' '}Sign in
                </li>}
          </Link>

        </ul>
      </div>
    </header>
  );
};

export default Header;
