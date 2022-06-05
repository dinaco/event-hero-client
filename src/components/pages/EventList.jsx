import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Typography } from "@mui/material";
import EventCard from "../Event/EventCard";
import LoadingImg from "../LoadingImg";

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchEvents, setSearchEvents] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const handleSearch = (e) => setSearchEvents(e.target.value);

  const queryEvents = async () => {
    try {
      setPageLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/events?q=${searchEvents}`
      );
      setEvents(response.data);
      setPageLoading(false);
    } catch (error) {
      console.log(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    queryEvents();
  }, [searchEvents]);

  return (
    <div>
      <Typography variant='h5' gutterBottom component='div'>
        Check out our great events!
      </Typography>
      <TextField
        label='Search Events'
        variant='outlined'
        onChange={handleSearch}
        value={searchEvents}
        fullWidth
      />
      {pageLoading && <LoadingImg />}
      {events.length === 0 && !pageLoading && (
        <Typography variant='h3' gutterBottom component='div'>
          No events found!
        </Typography>
      )}
      {events.length !== 0 && (
        <>
          {events.map((event) => {
            if (event.active) {
              return <EventCard key={event._id} eventInfo={event} />;
            }
          })}
        </>
      )}
    </div>
  );
}

export default EventList;
