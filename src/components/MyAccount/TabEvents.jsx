import React, { useState } from "react";
import { Paper, Tabs, Tab, Typography, Box } from "@mui/material";
import Ongoing from "./Ongoing";
import PastEvents from "./PastEvents";
import UpcomingEvents from "./UpcomingEvents";

const TabEvents = ({ userEvents, today }) => {
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
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}>
        {value === index && (
          <Box p={4}>
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
        aria-label='events tabs'>
        <Tab label="Today's" />
        <Tab label='Upcoming' />
        <Tab label='Past' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Ongoing
          today={today}
          userEvents={userEvents}
          handleChange={handleChange}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpcomingEvents
          today={today}
          userEvents={userEvents}
          handleChange={handleChange}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PastEvents
          today={today}
          userEvents={userEvents}
          handleChange={handleChange}
        />
      </TabPanel>
    </Paper>
  );
};

export default TabEvents;
