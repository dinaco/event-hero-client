import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function UpcomingEvents({ userEvents, today }) {
  return (
    <div>
      {!userEvents && <h2>No Upcoming events</h2>}
      {userEvents && (
        <>
          <h3>Upcoming events</h3>
          {/* userInfo.events.lenght > 0 && */}
          {userEvents.map((event) => {
            if (
              moment(today.split("T")[0]).isBefore(event.date.split("T")[0])
            ) {
              return (
                <p key={event._id}>
                  <Link to={`/event/${event._id}`}>{event.name}</Link>
                  <span> | {moment(event.date).format("DD/MM/YYYY")}</span>
                </p>
              );
            } else {
              <h3>No events in your account</h3>;
              <Link to={`/events`}>Check out our events!</Link>;
            }
          })}
        </>
      )}
    </div>
  );
}

export default UpcomingEvents;
