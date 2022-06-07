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

function ProductsList() {
  const productsFilters = [
    <TextInput label='Search name' source='q' alwaysOn />,
  ];
  return (
    <List filters={productsFilters}>
      <Datagrid rowClick='edit'>
        <TextField source='name' />
        <TextField source='manufacturer' />
        <NumberField
          source='price'
          options={{ style: "currency", currency: "EUR" }}
        />
        <BooleanField source='active' />
        <DateField source='createdAt' />
        <TextField source='event.name' label='Linked Events' />
      </Datagrid>
    </List>
  );
}

export default ProductsList;
