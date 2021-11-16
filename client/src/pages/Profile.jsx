import React, { useEffect, useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import useStore from "../Store/Store";
import LoadingScreen from "../Utils/Loading";
const Profile = () => {
  const { state } = useLocation();
  const Auth = useStore((state) => state.auth);
  const [Loading, setLoading] = useState(true);
  const currentUser = useStore((state) => state.currentUser);
  useEffect(() => {
    if (Auth !== true) {
      const getCurrentUser = async () => {
        await currentUser();
        setLoading(false);
      };
      getCurrentUser();
    }

    Auth ? setLoading(false) : null;
  }, []);
  if (Loading) {
    return <LoadingScreen />;
  }
  return (
    <div>
      {Auth === true ? (
        <div className="container m">
          <h1>Hello {console.log(state.user)}</h1>
        </div>
      ) : (
        <Redirect to={"/"} />
      )}
    </div>
  );
};

export default Profile;
