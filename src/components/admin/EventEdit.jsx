import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ImageInput,
  ChipField,
  SingleFieldList,
  ImageField,
  required,
  ReferenceArrayField,
  NumberInput,
  BooleanInput,
} from "react-admin";

function EventEdit() {
  return (
    <Edit title='Event Info'>
      <SimpleForm label='summary' path='events'>
        <TextInput disabled label='Id' source='id' />
        <ImageField source='splashImg' title='name' />
        <ImageInput
          source='splashImg'
          label='Change image'
          accept='image/*'></ImageInput>

        <TextInput source='name' validate={required()} />
        <BooleanInput source='active' validate={required()} />
        <DateInput
          label='Created at'
          source='createdAt'
          locales='fr-FR'
          disabled
        />
        <NumberInput
          source='users.length'
          label='Attending Customers'
          disabled
        />
        <ReferenceArrayField
          label='Attending Customers'
          reference='users'
          source='users'>
          <SingleFieldList>
            <ChipField source='email' />
          </SingleFieldList>
        </ReferenceArrayField>
      </SimpleForm>
    </Edit>
  );
}

export default EventEdit;
