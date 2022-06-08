import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  required,
  NumberInput,
  BooleanInput,
  minValue,
} from "react-admin";
import ProductEventsSelectCreate from "./event-admin/ProductEventsSelectCreate";

function ProductCreate() {
  const validatePrice = [required(), minValue(0)];

  return (
    <Create title='Products Info'>
      <SimpleForm label='products' path='products'>
        <TextInput source='name' validate={required()} />
        <ImageInput
          source='productImg'
          label='Product image'
          accept='image/*'></ImageInput>
        <TextInput source='manufacturer' validate={required()} />
        <NumberInput
          source='price'
          min={0}
          options={{ style: "currency", currency: "EUR" }}
          validate={validatePrice}
        />
        <BooleanInput source='active' defaultValue={true} />
        <ProductEventsSelectCreate />
      </SimpleForm>
    </Create>
  );
}

export default ProductCreate;
