import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  Box,
  Stack,
  Divider,
  Chip,
  CardMedia,
  AvatarGroup,
  Avatar,
  IconButton,
  Collapse,
  CardActions,
  CardContent,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { grey } from "@mui/material/colors";
import moment from "moment";
import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventActions from "./EventActions";

const StyledLocation = styled(Typography)`
  && {
    display: flex;
    align-items: center;
  }
`;

const ExpandMore = styled(({ expand, ...other }) => {
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
}));

function EventCard({ eventInfo, user }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ my: 2 }}>
      <Link to={`/event/${eventInfo._id}`}>
        <CardMedia
          component='img'
          image={eventInfo.splashImg}
          alt={eventInfo.name}
        />
      </Link>
      <Box sx={{ p: 2 }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          spacing={0.5}>
          <Link to={`/event/${eventInfo._id}`}>
            <Typography variant='h5' fontWeight={700}>
              {eventInfo.name}
            </Typography>
          </Link>
          {eventInfo.customers[0] && eventInfo.customers[0].profileImg && (
            <AvatarGroup spacing='small' total={eventInfo.customers.length}>
              {eventInfo.customers.slice(0, 2).map((customer) => (
                <Avatar
                  key={customer._id}
                  alt={customer.name}
                  src={customer.profileImg}
                />
              ))}
            </AvatarGroup>
          )}
        </Stack>
        {user && eventInfo && <EventActions user={user} event={eventInfo} />}
      </Box>
      <Divider />
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ px: 2, py: 1, bgcolor: "background.default" }}>
        <Chip
          icon={<CalendarMonthIcon />}
          label={moment(eventInfo.date).format("DD/MM/YYYY")}
        />
        <StyledLocation variant='body2' color='text.secondary'>
          <LocationOnIcon sx={{ color: grey[500] }} /> {eventInfo.location.city}
          , {eventInfo.location.state} - {eventInfo.location.country}
        </StyledLocation>
      </Stack>
      <Divider />
      <CardActions onClick={handleExpandClick} disableSpacing>
        <Typography variant='body1'>Event Details</Typography>
        <ExpandMore
          expand={expanded}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>{eventInfo.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default EventCard;
