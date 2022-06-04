import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AttendEventButton({ user, event }) {
  const [attending, setAttending] = useState(false);
  const changeAttendingStatus = () => {
    const body = { attending };
    const getToken = localStorage.getItem("authToken");
    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/api/event/${event._id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((response) => {
        setAttending(!attending);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setAttending(event.customers.some((customer) => customer._id === user._id));
  }, []);

  const addEventButton = () => {
    if (user) {
      if (attending) {
        return (
          <button onClick={() => changeAttendingStatus()}>Remove Event</button>
        );
      } else {
        return (
          <button onClick={() => changeAttendingStatus()}>Attend Event</button>
        );
      }
    } else {
      return <Link to='/'>Login to Attend Event</Link>;
    }
  };

  return <div>{addEventButton()}</div>;
}

export default AttendEventButton;
