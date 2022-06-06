import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceManyField,
  Datagrid,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
  PasswordInput,
  ImageField,
  SelectInput,
  required,
  NumberInput,
  BooleanInput,
} from "react-admin";

function UserCreate() {
  return (
    <Create>
      <SimpleForm>
        <ImageField source='profileImg' title='profile image' />
        <TextInput source='name' validate={required()} />
        <TextInput source='email' validate={required()} />
        <PasswordInput
          source='hashedPassword'
          title='password'
          validate={required()}
        />
        <SelectInput
          source='role'
          choices={[
            { id: "customer", name: "Customer" },
            { id: "app-admin", name: "App Admin" },
            { id: "event-admin", name: "Event Admin" },
            { id: "event-staff", name: "Event Staff" },
          ]}
        />
        <BooleanInput source='active' validate={required()} />
      </SimpleForm>
    </Create>
  );
}

export default UserCreate;
