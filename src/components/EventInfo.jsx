import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import AttendEventButton from "./AttendEventButton";

function EventInfo({ user }) {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

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
          <AttendEventButton user={user} event={event} />
          <p>{moment(event.date).format("DD/MM/YYYY")}</p>
          <p>{event.description}</p>
        </>
      )}
    </div>
  );
}

export default EventInfo;
