import React, { useState } from "react";
import { Paper, Tabs, Tab, Typography, Box } from "@mui/material";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/SignUp";
const SignInOutContainer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    e.preventDefault();
    setValue(newValue);
  };

  const paperStyle = { width: 340, margin: "20px auto" };
  function TabPanel({ children, value, index, ...other }) {
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        aria-label='disabled tabs example'>
        <Tab label='Sign In' />

        <Tab label='Sign Up' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup handleChange={handleChange} />
      </TabPanel>
    </Paper>
  );
};

export default SignInOutContainer;
