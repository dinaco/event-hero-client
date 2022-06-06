import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  required,
  NumberInput,
  BooleanInput,
} from "react-admin";

function ProductCreate() {
  return (
    <Create title='Products Info'>
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
        <TextInput source='event.name' validate={required()} />
      </SimpleForm>
    </Create>
  );
}

export default ProductCreate;
