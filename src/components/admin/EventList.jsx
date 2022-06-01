import React from "react";
import {
  List,
  ReferenceField,
  Datagrid,
  TextInput,
  TextField,
  DateField,
  ArrayField,
  SingleFieldList,
  ChipField,
  BooleanField,
  NumberField,
} from "react-admin";

function EventList() {
  const eventFilters = [
    <TextInput label='Search name' source='q' alwaysOn />,
    // <TextInput label='Search Email' source='q' />,
  ];
  return (
    <List filters={eventFilters}>
      <Datagrid rowClick='edit'>
        <TextField source='name' />
        <DateField source='date' />
        <BooleanField source='active' />
        <DateField source='createdAt' />
        <NumberField source='users.length' label='Attending Customers' />
      </Datagrid>
    </List>
  );
}

export default EventList;
