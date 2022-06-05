import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Switch,
  FormControl,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

function AttendEventButton({ user, event }) {
  const navigate = useNavigate();

  const [attending, setAttending] = useState(
    event.customers.some((customer) => customer._id === user._id)
  );
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
        console.log("what");
        setAttending(!attending);
        navigate(`/event/${event._id}`);
      })
      .catch((err) => console.log(err));
  };

  /*   const AttendEventToggle = () => {
    setAttending(!attending);
    changeAttendingStatus();
  }; */

  return (
    <FormControl component='fieldset'>
      <FormGroup aria-label='position' row>
        <FormControlLabel
          value='top'
          control={
            <Switch
              checked={attending}
              onChange={changeAttendingStatus}
              size='large'
            />
          }
          label='Attend?'
          labelPlacement='top'
        />
      </FormGroup>
    </FormControl>
  );
}

export default AttendEventButton;
