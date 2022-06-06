import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceManyField,
  Datagrid,
  ImageInput,
  ChipField,
  SingleFieldList,
  ArrayField,
  FormTab,
  PasswordInput,
  ImageField,
  ReferenceArrayInput,
  required,
  SelectArrayInput,
  ReferenceInput,
  NumberInput,
  BooleanInput,
  ArrayInput,
  Tab,
  SelectField,
} from "react-admin";

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
        <ReferenceArrayInput source='events' reference='event'>
          <SelectArrayInput optionText='name' />
        </ReferenceArrayInput>
        <TextInput source='event.name' validate={required()} />
      </SimpleForm>
    </Edit>
  );
}

export default ProductEdit;
