import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  SelectInput,
  required,
  BooleanInput,
  ImageInput,
  minLength,
  email,
} from "react-admin";
import StaffCreateEvents from "./event-admin/StaffCreateEvents";

function UserCreate() {
  const validateEmail = [required(), email()];
  const validatePassword = [required(), minLength(8)];

  return (
    <Create>
      <SimpleForm>
        <ImageInput
          source='profileImg'
          label='User image'
          accept='image/*'></ImageInput>
        <TextInput source='name' validate={required()} />
        <TextInput source='email' validate={validateEmail} />
        <PasswordInput
          source='hashedPassword'
          label='Password'
          validate={validatePassword}
        />
        <SelectInput
          source='role'
          validate={required()}
          choices={[
            { id: "app-admin", name: "App Admin" },
            { id: "event-admin", name: "Event Admin" },
            { id: "event-staff", name: "Event Staff" },
          ]}
        />
        <StaffCreateEvents />
        <BooleanInput source='active' />
      </SimpleForm>
    </Create>
  );
}

export default UserCreate;
