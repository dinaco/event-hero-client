import React, { useState, useEffect } from "react";
import moment from "moment";
import { Paper, Typography, Stack } from "@mui/material";
import LoadingImg from "../LoadingImg";
import axios from "axios";
import Balance from "../MyAccount/Balance";
import TabEvents from "../MyAccount/TabEvents";

function MyAccount() {
  let today = moment(new Date()).format();
  const [userInfo, setUserInfo] = useState(null);
  const getUserInfo = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/my-events`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {!userInfo && <LoadingImg />}
      {userInfo && (
        <Stack spacing={2}>
          <Paper elevation={20}>
            <Typography px={4} py={1} variant='h4' component='div' gutterBottom>
              Hi, {userInfo.name}
            </Typography>
            {userInfo.role === "customer" && (
              <Balance balance={userInfo.balance} />
            )}
          </Paper>
          <TabEvents today={today} userEvents={userInfo.events} />
        </Stack>
      )}
    </div>
  );
}

export default MyAccount;
