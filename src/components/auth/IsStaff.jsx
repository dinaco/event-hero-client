import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsStaff({ children }) {
  const { user, isLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading ...</p>;

  if (user.role !== "staff") {
    return navigate("/");
  } else {
    return children;
  }
}

export default IsStaff;
