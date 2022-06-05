import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import moment from "moment";
import EventCard from "../Event/EventCard";

function PastEvents({ userEvents, today }) {
  let eventsCounter = 0;
  return (
    <div>
      {userEvents && (
        <>
          {/* userInfo.events.lenght > 0 && */}
          {userEvents.map((event) => {
            if (moment(today.split("T")[0]).isAfter(event.date.split("T")[0])) {
              eventsCounter++;
              return <EventCard key={event._id} eventInfo={event} />;
            } else {
              <h3>No events in your account</h3>;
              <Link to={`/events`}>Check out our events!</Link>;
            }
          })}
          {eventsCounter === 0 && (
            <Typography variant='body1'>
              {eventsCounter} past events.
              <Link to={`/events`}>Check out our events!</Link>
            </Typography>
          )}
        </>
      )}
    </div>
  );
}

export default PastEvents;
