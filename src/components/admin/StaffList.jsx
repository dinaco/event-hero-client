import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ChipField,
  SingleFieldList,
  PasswordInput,
  ImageField,
  SelectInput,
  required,
  TabbedShowLayout,
  ReferenceArrayField,
  NumberInput,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";

function StaffList() {
  return (
    <div>hi</div>
    /* <Edit title='Staff Info'>
    <SimpleForm label='staff' path='staff'>
    <NumberInput source='staff.length' label='Staff Amount' disabled />
    <ReferenceArrayField
      label='Staff List'
      reference='events.staff'
      source='events.staff'>
      <SingleFieldList>
        <ChipField source='name' />
      </SingleFieldList>
    </ReferenceArrayField>
    <ArrayInput source='events.staff'>
      <SimpleFormIterator>
        <TextInput source='name' validate={required()} />
        <TextInput source='email' validate={required()} />
        <TextInput source='role' defaultValue='event-staff' disabled />
        <PasswordInput source='hashedPassword' validate={required()} />
        <BooleanInput
          source='active'
          defaultValue={true}
          validate={required()}
        />
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
  <Edit /> */
  );
}

export default StaffList;
