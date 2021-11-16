import React, { useState } from "react";
import { useEffect } from "react";
import useStore from "../Store/Store";
import Jobs from "./Jobs";
import LoadingScreen from "../Utils/Loading";
function Home() {
  const auth = useStore((state) => state.auth);
  const currentUser = useStore((state) => state.currentUser);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const getCurrentUser = async () => {
      await currentUser();
      setLoading(false);
    };
    getCurrentUser();
  }, []);
  if (Loading) {
    return <LoadingScreen />;
  }
  return (
    <div>
      {auth === true ? (
        <Jobs />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="uppercase" style={{ letterSpacing: "4px" }}>
            please Sign In Or Sign Up
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
