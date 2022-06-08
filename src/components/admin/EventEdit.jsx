import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ImageInput,
  ChipField,
  SingleFieldList,
  useEditContext,
  required,
  ReferenceArrayField,
  NumberInput,
  BooleanInput,
  DateTimeInput,
} from "react-admin";

function EventEdit() {
  const StyledImg = () => {
    const { record, isLoading } = useEditContext();
    if (isLoading) return null;
    return (
      <img height='250' width='auto' src={record.splashImg} alt={record.name} />
    );
  };

  return (
    <Edit title='Event Info'>
      <SimpleForm label='summary' path='events'>
        <TextInput disabled label='Id' source='id' />
        <StyledImg />
        <ImageInput
          source='splashImg'
          label='Change image'
          accept='image/*'></ImageInput>
        <TextInput source='name' validate={required()} />
        <DateTimeInput source='date' validate={required()} />
        <BooleanInput source='active' />
        <BooleanInput source='takeOrders' />
        <TextInput source='location' />
        <DateInput label='Created at' source='createdAt' disabled />
        <NumberInput
          source='customers.length'
          label='Attending Customers'
          disabled
        />
        <ReferenceArrayField
          label='Attending Customers'
          reference='users'
          source='customers'>
          <SingleFieldList>
            <ChipField source='email' />
          </SingleFieldList>
        </ReferenceArrayField>
      </SimpleForm>
    </Edit>
  );
}

export default EventEdit;
