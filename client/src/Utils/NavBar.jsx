import React, { useState } from 'react';
import { Link, Redirect, NavLink, useLocation } from 'react-router-dom';
import useStore from '../Store/Store';
function NavBar() {
  const auth = useStore((state) => state.auth);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logOut);
  const [direct, setDirect] = useState(false);
  const handleOut = () => {
    logout();
    setDirect(true);
  };
  return (
    <nav>
      <div className="">
        <div className="flex justify-between h-16 px-10 shadow items-center">
          <div className="flex items-center space-x-8">
            <h1
              className={`text-xl lg:text-2xl font-bold cursor-pointer ${
                useLocation().pathname === '/' ? 'text-indigo-600' : null
              } hover:text-indigo-600 transform transition duration-500 hover:scale-110`}
            >
              <Link to={'/'} className='border-2 p-1 border-white text-white font-mono bg-indigo-800 rounded-md'>RepairX</Link>
            </h1>
          </div>
          {!auth ? (
            <div className="flex space-x-4 items-center">
              <Link
                to={'/login'}
                className={`px-4 py-2 rounded  text-sm ${
                  useLocation().pathname === '/login'
                    ? 'text-indigo-500 font-bold'
                    : 'text - gray - 600'
                } hover:text-indigo-500 transform transition duration-500 hover:scale-110`}
              >
                SIGN IN
              </Link>

              <Link
                to={'/register'}
                className={`px-4 py-2 rounded ${
                  useLocation().pathname === '/register'
                    ? 'text-indigo-500 font-bold'
                    : 'text - gray - 600'
                } text-sm hover:text-indigo-500 transform transition duration-500 hover:scale-110`}
              >
                SIGN UP
              </Link>
            </div>
          ) : (
            <div className="flex space-x-4 items-center">
              <h1 className="text-xl lg:text-2xl font-bold cursor-pointer hover:text-indigo-500 transform transition duration-500 hover:scale-110">
                  {user} 
              </h1>
              <div className="cursor-pointer hover:text-indigo-500 transform transition duration-500 hover:scale-110 text-xl lg:text-2xl font-bold">
              <Link to={'/'} 
                  onClick={handleOut} className='border-2 p-1 border-white text-white font-mono bg-black rounded-md'>LogOff</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
