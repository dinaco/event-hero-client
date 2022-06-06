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

//TODO: Qty Sold not working
// its returning the same for all products

function ProductsList() {
  const productsFilters = [
    <TextInput label='Search name' source='q' alwaysOn />,
    // <TextInput label='Search Email' source='q' />,
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
        <TextField source='event.products.length' label='Qty Sold' />
      </Datagrid>
    </List>
  );
}

export default ProductsList;
