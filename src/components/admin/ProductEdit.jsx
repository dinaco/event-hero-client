import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  required,
  NumberInput,
  BooleanInput,
  ChipField,
} from "react-admin";
import ProductEventsSelect from "./ProductEventsSelect";

function ProductEdit() {
  return (
    <Edit title='Products Info'>
      <SimpleForm label='products' path='products'>
        <TextInput source='name' validate={required()} />
        <ImageField source='productImg' title='name' />
        <ImageInput
          source='productImg'
          label='Change image'
          accept='image/*'></ImageInput>
        <TextInput source='manufacturer' validate={required()} />
        <NumberInput
          source='price'
          options={{ style: "currency", currency: "EUR" }}
          validate={required()}
        />
        <BooleanInput
          source='active'
          defaultValue={true}
          validate={required()}
        />
        <ProductEventsSelect source='event' />
        <ChipField source='event.name' validate={required()} />
      </SimpleForm>
    </Edit>
  );
}

export default ProductEdit;
