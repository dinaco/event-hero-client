import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ImageInput,
  ChipField,
  SingleFieldList,
  ImageField,
  required,
  ReferenceArrayField,
  SelectInput,
  BooleanInput,
} from "react-admin";

function EventCreate() {
  return (
    <Create>
      <SimpleForm path='events'>
        <ImageField source='splashImg' title='name' />
        <ImageInput
          source='splashImg'
          label='Change image'
          accept='image/*'></ImageInput>

        <TextInput source='name' validate={required()} />
        <TextInput multiline='true' source='description' />
        <DateTimeInput source='date' validate={required()} />
        <BooleanInput source='active' validate={required()} />
        <BooleanInput source='takeOrders' validate={required()} />
        <TextInput source='location' />
      </SimpleForm>
    </Create>
  );
}

export default EventCreate;
