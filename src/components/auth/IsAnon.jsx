import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import LoadingImg from "../LoadingImg";

function IsAnon({ children }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (isLoading) return <LoadingImg />;

  if (!isLoggedIn) {
    return children;
  } else if (user.role === "customer" || user.role === "event-staff") {
    return navigate("/my-account");
  } else if (user.role === "app-admin" || user.role === "event-admin") {
    return navigate("/admin");
  }
}

export default IsAnon;
