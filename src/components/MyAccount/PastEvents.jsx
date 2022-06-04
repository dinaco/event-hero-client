import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function PastEvents({ userEvents, today }) {
  let eventsCounter = 0;
  return (
    <div>
      {!userEvents && <h2>No Past events</h2>}
      {userEvents && (
        <>
          <h3>Past events</h3>
          {/* userInfo.events.lenght > 0 && */}
          {userEvents.map((event) => {
            if (moment(today.split("T")[0]).isAfter(event.date.split("T")[0])) {
              eventsCounter++;
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
          {eventsCounter === 0 && (
            <>
              <p>{eventsCounter} past events.</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PastEvents;
