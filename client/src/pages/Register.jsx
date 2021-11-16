import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import useStore from '../Store/Store';
import { Redirect } from 'react-router-dom';
import AuthService from '../Service/Auth.Service';
import { Link } from 'react-router-dom';

function Login() {
  const setAuth = useStore((state) => state.setAuth);
  const Auth = useStore((state) => state.auth);
  const [err, setErr] = useState('');
  const currentUser = useStore((state) => state.currentUser);
  const [direct, setDirect] = useState(false);
  useEffect(() => {
    const getCurrentUser = async () => {
      await currentUser();
    };
    getCurrentUser();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values) => {
      const res = await AuthService.register(values.username, values.password);
      if (res.auth !== true) {
        setErr(res.message);
      } else {
        setErr('');
        localStorage.setItem('token', res.token);
        await setAuth();
        setDirect(true);
      }
    }
  });
  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      {direct ? (
        <Redirect push to="/" />
      ) : Auth ? (
        <Redirect push to="/" />
      ) : null}
      <div className="py-6 px-8 mt-20 bg-white rounded-t-box shadow-xl h-2/4">
        <h6 className="pl-32 text-xl lg:text-2xl font-bold cursor-pointer text-indigo-600 hover: transform transition duration-500 hover:scale-110">
          Sign Up
        </h6>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              style={{ letterSpacing: '3px' }}
              className="block text-gray-800 font-bold"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="username"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              style={{ letterSpacing: '3px' }}
              className="block text-gray-800 font-bold"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none ring-1 focus:ring-indigo-500"
            />

            <Link
              to={'/login'}
              className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
            >
              Already Registered? Click Me!
            </Link>
          </div>
          {err !== '' ? (
            <span className="text-sm font-medium text-red-500  mt-2 inline-block">
              {err}
            </span>
          ) : null}

          <button
            className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded transition duration-500 hover:scale-95"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
