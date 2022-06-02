import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import EventInfo from "../Event/EventInfo";

function Event() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <EventInfo user={user} />
    </div>
  );
}

export default Event;
