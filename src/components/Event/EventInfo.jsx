import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import AttendEventButton from "./AttendEventButton";
import OrderButton from "../Order/OrderButton";

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/event/${eventId}`)
      .then((response) => setEvent(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {!event && <h2>No events found!</h2>}
      {event && (
        <>
          <img
            src={event.splashImg}
            alt={event.name}
            height='150px'
            width='100%'
          />
          <h2>{event.name}</h2>
          {user.role === "customer" && (
            <AttendEventButton user={user} event={event} />
          )}
          {user.role === "customer" && (
            <OrderButton user={user} event={event} />
          )}
          <p>{moment(event.date).format("DD/MM/YYYY")}</p>
          <p>{event.description}</p>
          <Link to={`/orders/${eventId}`}>Order List</Link>
        </>
      )}
    </div>
  );
}

export default EventInfo;
