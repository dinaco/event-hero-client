import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function UpcomingEvents({ userEvents, today }) {
  let eventsCounter = 0;
  return (
    <div>
      {!userEvents && <h2>No Upcoming events</h2>}
      {userEvents && (
        <>
          <h3>Upcoming events</h3>
          {userEvents.map((event) => {
            if (
              moment(today.split("T")[0]).isBefore(event.date.split("T")[0]) &&
              event.active
            ) {
              eventsCounter++;
              return (
                <p key={event._id}>
                  <Link to={`/event/${event._id}`}>{event.name}</Link>
                  <span> | {moment(event.date).format("DD/MM/YYYY")}</span>
                </p>
              );
            }
          })}
          {eventsCounter === 0 && (
            <>
              <p>
                {eventsCounter} upcoming events.
                <Link to={`/events`}>Check out our events!</Link>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default UpcomingEvents;
