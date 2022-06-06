import React from "react";
import {
  List,
  Datagrid,
  TextInput,
  TextField,
  DateField,
  BooleanField,
  NumberField,
} from "react-admin";

function EventListSimple() {
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
        <BooleanField source='takeOrders' title='Taking Orders' />
        <DateField source='createdAt' />
        <NumberField source='customers.length' label='Attending Customers' />
      </Datagrid>
    </List>
  );
}

export default EventListSimple;
