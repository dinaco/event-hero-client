import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/events`
      );
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {events.length === 0 && <h2>Loading...</h2>}
      {events.length !== 0 && (
        <>
          <h2>Check out our great events!</h2>
          {events.map((event) => {
            return (
              <p key={event._id}>
                <Link to={`/event/${event._id}`}>{event.name}</Link>
                <span> | {moment(event.date).format("DD/MM/YYYY")}</span>
              </p>
            );
          })}
        </>
      )}
    </div>
  );
}

export default EventList;
