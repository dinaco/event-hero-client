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

function ProductsList() {
  return (
    <List>
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
