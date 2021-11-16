import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import useStore from "../Store/Store";
import JobService from "../Service/Jobs.Service";
import LoadingScreen from "../Utils/Loading";
function RegisterJob() {
  const Auth = useStore((state) => state.auth);
  const token = useStore((state) => state.token);
  const currentUser = useStore((state) => state.currentUser);
  const [Loading, setLoading] = useState(true);
  const [direct, setDirect] = useState(false);
  useEffect(() => {
    async function getUser() {
      await currentUser();
      setLoading(false);
    }
    getUser();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      device: "",
      defect: "",
      number: "",
      price: "",
    },
    onSubmit: async (values) => {
      const res = await JobService.registerJob(values, token);
      res.Status === 201 ? setDirect(true) : null;
    },
  });
  if (Loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex h-screen  items-center justify-center bg-gray-100">
      {direct ? <Redirect push to="/" /> : !Auth ? <Redirect push to="/" /> : null}
      <div className="grid bg-white rounded-t-box shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
        <div className="flex justify-center">
          <div className="flex">
            <h1 className="text-xl lg:text-2xl font-bold cursor-pointer text-indigo-600">Add Job</h1>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Name</label>
            <input
              className="py-2 px-3 rounded-lg border-2 border-indigo-500 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Phone</label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-indigo-500 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="text"
                placeholder="Phone Number"
                name="number"
                onChange={formik.handleChange}
                value={formik.values.number}
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Device</label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-indigo-500 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="text"
                name="device"
                placeholder="e.g. Galaxy s10"
                onChange={formik.handleChange}
                value={formik.values.device}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Defect</label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-indigo-500 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="text"
                placeholder="e.g. Lcd"
                name="defect"
                onChange={formik.handleChange}
                value={formik.values.defect}
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Price</label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-indigo-600 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                type="text"
                placeholder="Cost"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </div>
          </div>
          <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
            <Link
              to={"/"}
              className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-auto bg-indigo-500 hover:bg-indigo-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterJob;
