/* import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import LoadingImg from "../LoadingImg";

function IsAdmin({ children }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

   if (isLoading || !user) return <LoadingImg />;
  useEffect(() => {
    while (isLoading) {
      return <LoadingImg />;
    }
    return children;

      if (isLoading || !user) {
      
    } else {
      if (
        !isLoggedIn ||
        user.role !== "app-admin" ||
        user.role !== "event-admin"
      ) {
        return navigate("/");
      } else {
        return children;
      }
    }
  }, [user]);
}
export default IsAdmin; */
