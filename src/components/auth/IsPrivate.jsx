import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsStaff({ children }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn || user.role !== "event-staff") {
    return navigate("/");
  } else {
    return children;
  }
}

function IsCustomer({ children }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn || user.role !== "customer") {
    return navigate("/");
  } else {
    return children;
  }
}

function IsAdmin({ children }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn || user.role !== "app-admin" || user.role !== "event-admin") {
    return navigate("/");
  } else {
    return children;
  }
}

export { IsStaff, IsCustomer, IsAdmin };
