import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Fab } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function AttendEventButton({ attending, setAttending, event }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const changeAttendingStatus = () => {
    if (user) {
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
          navigate(`/event/${event._id}`);
        })
        .catch((err) => console.log(err));
    } else {
      navigate(`/`);
    }
  };

  /*   const AttendEventToggle = () => {
    setAttending(!attending);
    changeAttendingStatus();
  }; */

  return (
    <Fab
      color={attending ? "primary" : ""}
      onClick={changeAttendingStatus}
      size='large'
      aria-label='favorite'>
      <LocalFireDepartmentIcon />
    </Fab>
  );
}

export default AttendEventButton;
