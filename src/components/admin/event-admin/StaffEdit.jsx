import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ImageField,
  required,
  BooleanInput,
} from "react-admin";
import StaffCreateEvents from "./StaffCreateEvents";

function StaffEdit() {
  return (
    <Create>
      <SimpleForm>
        <ImageField source='profileImg' title='profile image' />
        <TextInput source='name' validate={required()} />
        <TextInput source='email' validate={required()} />
        <StaffCreateEvents />
        <BooleanInput source='active' validate={required()} />
      </SimpleForm>
    </Create>
  );
}

export default StaffEdit;
