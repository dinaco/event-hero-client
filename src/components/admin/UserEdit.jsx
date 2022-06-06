import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
  ImageField,
  SelectInput,
  required,
  NumberInput,
  BooleanInput,
} from "react-admin";

function UserEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled label='Id' source='id' />
        <ImageField source='profileImg' title='name' />
        <TextInput source='name' validate={required()} />
        <TextInput source='email' validate={required()} />
        <SelectInput
          source='role'
          choices={[
            { id: "app-admin", name: "App Admin" },
            { id: "event-admin", name: "Event Admin" },
            { id: "event-staff", name: "Event Staff" },
          ]}
        />
        <NumberInput source='balance' validate={required()} />
        <BooleanInput source='active' validate={required()} />
        <DateInput
          label='Member since'
          source='createdAt'
          locales='fr-FR'
          disabled
        />
        <NumberInput source='events.length' label='Events Attending' disabled />
        <ReferenceArrayField source='events' reference='events'>
          <SingleFieldList>
            <ChipField source='name' />
          </SingleFieldList>
        </ReferenceArrayField>
      </SimpleForm>
    </Edit>
  );
}

export default UserEdit;
