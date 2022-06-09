import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";
import LoadingImg from "../LoadingImg";

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setPageLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/event/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPageLoading(false);
      });
  }, []);

  return (
    <div>
      {pageLoading && <LoadingImg />}
      {event && <EventCard user={user} eventInfo={event} />}
    </div>
  );
}

export default EventInfo;
