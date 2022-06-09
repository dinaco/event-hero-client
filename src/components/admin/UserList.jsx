import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  TextInput,
  BooleanField,
  ChipField,
  NumberField,
  useGetList,
} from "react-admin";
import { Typography } from "@mui/material";

function UserList() {
  const userFilters = [
    <TextInput label='Search name' source='q' alwaysOn />,
    // <TextInput label='Search Email' source='q' />,
  ];
  const Aside = () => {
    // const { data, isLoading } = useListContext();
    const { data, isLoading } = useGetList("users");
    if (isLoading) return null;

    return (
      <div style={{ width: 200, margin: "1em" }}>
        <Typography variant='h6' gutterBottom>
          User's Summary
        </Typography>
        <Typography variant='body1' gutterBottom>
          Total Balance: €{" "}
          {data.reduce((sum, amount) => sum + amount.balance, 0).toFixed(2)}
        </Typography>
        <Typography variant='body2' gutterBottom>
          Total Customers:{" "}
          {data.filter((user) => user.role === "customer").length}
        </Typography>
        <Typography variant='body2' gutterBottom>
          Total Staff:{" "}
          {data.filter((user) => user.role === "event-staff").length}
        </Typography>
        <Typography variant='body2' gutterBottom>
          Total Event Admin:{" "}
          {data.filter((user) => user.role === "event-admin").length}
        </Typography>
        <Typography variant='body2' gutterBottom>
          Total App Admin:{" "}
          {data.filter((user) => user.role === "app-admin").length}
        </Typography>
      </div>
    );
  };

  /*   const AvatarField = ({ source }) => {
    const { data, isLoading } = useListContext();
    if (!data) return null;
    if (isLoading) return null;
    // console.log(source);
    return data.map((user) => {
      return (
        <Avatar
          src={`${user.profileImg}?size=25x25`}
          style={{ width: parseInt(25, 10), height: parseInt(25, 10) }}
          sx={{ width: 25, height: 25 }}
        />
      );
    });
  }; */

  return (
    <List aside={<Aside />} filters={userFilters}>
      <Datagrid rowClick='edit'>
        <TextField source='name' />
        <EmailField source='email' />
        <ChipField source='role' />
        <NumberField source='events.length' label='Attending Events' />
        <NumberField
          source='balance'
          options={{ style: "currency", currency: "EUR" }}
        />
        <BooleanField source='active' />
      </Datagrid>
    </List>
  );
}

export default UserList;
