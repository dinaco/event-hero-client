import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsAnon({ children }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    return children;
  } else if (user.role === "customer") {
    return navigate("/my-account");
  } else if (user.role === "event-staff") {
    return navigate("/staff");
  } else if (user.role === "app-admin" || user.role === "event-admin") {
    return navigate("/admin");
  }
}

export default IsAnon;
