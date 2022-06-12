import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageField,
  required,
  BooleanInput,
  ArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import StaffEditEvents from "./StaffEditEvents";
import { Typography } from "@mui/material";

function StaffEdit() {
  return (
    <Edit>
      <SimpleForm>
        <ImageField source='profileImg' title='profile image' />
        <TextInput source='name' validate={required()} />
        <TextInput source='email' validate={required()} />
        <BooleanInput source='active' validate={required()} />
        <StaffEditEvents source='staff' />
        <Typography variant='body1' gutterBottom>
          Current Events
        </Typography>
        <ArrayField source='events' title='Current Events'>
          <SingleFieldList>
            <ChipField source='name' />
          </SingleFieldList>
        </ArrayField>
      </SimpleForm>
    </Edit>
  );
}

export default StaffEdit;
