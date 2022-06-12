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
import StaffCreateEvents from "./StaffCreateEvents";

function StaffCreate() {
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
          validate={required()}
          source='role'
          choices={[
            { id: "event-admin", name: "Event Admin" },
            { id: "event-staff", name: "Event Staff" },
          ]}
        />
        <StaffCreateEvents source='events-role' />
        <BooleanInput source='active' validate={required()} />
      </SimpleForm>
    </Create>
  );
}

export default StaffCreate;
