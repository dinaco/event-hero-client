import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import EventInfo from "./EventInfo";

function Event() {
  const { storeToken, authenticateUser, user } = useContext(AuthContext);

  /*   useEffect(() => {
    authenticateUser();
  }, []); */

  return (
    <div>
      <EventInfo user={user} />
    </div>
  );
}

export default Event;
