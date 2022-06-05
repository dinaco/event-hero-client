import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import moment from "moment";
import EventCard from "../Event/EventCard";

function UpcomingEvents({ userEvents, today }) {
  let eventsCounter = 0;
  return (
    <div>
      {userEvents && (
        <>
          {userEvents.map((event) => {
            if (
              moment(today.split("T")[0]).isBefore(event.date.split("T")[0]) &&
              event.active
            ) {
              eventsCounter++;
              return <EventCard key={event._id} eventInfo={event} />;
            }
          })}
          {eventsCounter === 0 && (
            <Typography variant='body1'>
              {eventsCounter} upcoming events.
              <Link to={`/events`}>Check out our events!</Link>
            </Typography>
          )}
        </>
      )}
    </div>
  );
}

export default UpcomingEvents;
