import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  TextInput,
  ImageField,
  NumberField,
  useListContext,
  FieldProps,
  useRecordContext,
} from "react-admin";
import { Avatar, Typography } from "@mui/material";

function UserList() {
  const userFilters = [
    <TextInput label='Search email' source='q' alwaysOn />,
    // <TextInput label='Search Email' source='q' />,
  ];
  const Aside = () => {
    const { data, isLoading } = useListContext();
    if (isLoading) return null;
    return (
      <div style={{ width: 200, margin: "1em" }}>
        <Typography variant='h6'>User</Typography>
        <Typography variant='body2'>
          Total views: {data.reduce((sum, amount) => sum + amount.balance, 0)}
        </Typography>
      </div>
    );
  };

  const AvatarField = ({ source }) => {
    const { data, isLoading } = useListContext();
    if (!data) return null;
    if (isLoading) return null;
    console.log(source);
    return data.map((user) => {
      return (
        <Avatar
          src={`${user.profileImg}?size=25x25`}
          style={{ width: parseInt(25, 10), height: parseInt(25, 10) }}
          sx={{ width: 25, height: 25 }}
        />
      );
    });
  };

  return (
    <List aside={<Aside />} filters={userFilters}>
      <Datagrid rowClick='show'>
        <TextField source='_id' />
        <AvatarField source='profileImg' />
        <EmailField source='email' />
        <NumberField
          source='balance'
          options={{ style: "currency", currency: "EUR" }}
        />
      </Datagrid>
    </List>
  );
}

export default UserList;
