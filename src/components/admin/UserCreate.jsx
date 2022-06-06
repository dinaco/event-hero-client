import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  ImageField,
  SelectInput,
  required,
  BooleanInput,
} from "react-admin";
import StaffCreateEvents from "./event-admin/StaffCreateEvents";

function UserCreate() {
  return (
    <Create>
      <SimpleForm>
        <ImageField source='profileImg' title='profile image' />
        <TextInput source='name' validate={required()} />
        <TextInput source='email' validate={required()} />
        <PasswordInput
          source='hashedPassword'
          label='Password'
          validate={required()}
        />
        <SelectInput
          source='role'
          choices={[
            { id: "app-admin", name: "App Admin" },
            { id: "event-admin", name: "Event Admin" },
            { id: "event-staff", name: "Event Staff" },
          ]}
        />
        <StaffCreateEvents />
        <BooleanInput source='active' validate={required()} />
      </SimpleForm>
    </Create>
  );
}

export default UserCreate;
