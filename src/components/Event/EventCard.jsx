import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  Box,
  Stack,
  CardActionArea,
  Divider,
  Chip,
  CardMedia,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { grey } from "@mui/material/colors";
import moment from "moment";
import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const InputTag = styled.input`
  border-radius: 10px;
  height: 20px;
`;

const StyledLocation = styled(Typography)`
  && {
    display: flex;
    align-items: center;
  }
`;

function EventCard({ eventInfo }) {
  return (
    <Card sx={{ maxWidth: 390, my: 2 }}>
      <Link to={`/event/${eventInfo._id}`}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            image={eventInfo.splashImg}
            alt={eventInfo.name}
          />
          <Box sx={{ p: 2 }}>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              spacing={0.5}>
              <Typography variant='h5' fontWeight={700}>
                {eventInfo.name}
              </Typography>
              <AvatarGroup spacing='small' total={eventInfo.customers.length}>
                {eventInfo.customers.slice(0, 2).map((customer) => (
                  <Avatar
                    key={customer._id}
                    alt={customer.name}
                    src={customer.profileImg}
                  />
                ))}
              </AvatarGroup>
            </Stack>
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
              <LocationOnIcon sx={{ color: grey[500] }} />{" "}
              {eventInfo.location.city}, {eventInfo.location.state} -{" "}
              {eventInfo.location.country}
            </StyledLocation>
          </Stack>
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default EventCard;
