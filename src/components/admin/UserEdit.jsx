import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  required,
  NumberInput,
  BooleanInput,
  PasswordInput,
  ImageInput,
  useEditContext,
  minLength,
  email,
  minValue,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
} from "react-admin";
import { Avatar } from "@mui/material";
import StaffEditEvents from "./event-admin/StaffEditEvents";

//TODO: enable editing users/staff/admin attending events

function UserEdit() {
  const validateEmail = [required(), email()];
  const validatePassword = [minLength(8)];
  const validateBalance = [required(), minValue(0)];

  const StyledAvatar = () => {
    const { record, isLoading } = useEditContext();
    if (isLoading) return null;
    return (
      <Avatar
        sx={{ width: 112, height: 112 }}
        src={record.profileImg}
        alt={record.name}
      />
    );
  };

  const SelectRole = () => {
    const { record, isLoading } = useEditContext();
    if (isLoading) return null;
    return (
      <SelectInput
        source='role'
        defaultValue={record.role}
        choices={[
          { id: "customer", name: "Customer" },
          { id: "app-admin", name: "App Admin" },
          { id: "event-admin", name: "Event Admin" },
          { id: "event-staff", name: "Event Staff" },
        ]}
      />
    );
  };

  return (
    <Edit title='User Info'>
      <SimpleForm>
        <TextInput disabled label='Id' source='id' />
        <StyledAvatar />
        <ImageInput
          source='profileImg'
          label='Change user image'
          accept='image/*'></ImageInput>
        <TextInput source='name' validate={required()} />
        <TextInput source='email' validate={validateEmail} />
        <PasswordInput source='password' validate={validatePassword} />

        <NumberInput source='balance' validate={validateBalance} />
        <BooleanInput source='active' />
        <DateInput label='Member since' source='createdAt' disabled />
        <SelectRole />
        <StaffEditEvents source='events' />
        <NumberInput source='events.length' label='Events Attending' disabled />
        <ReferenceArrayField source='events' reference='events'>
          <SingleFieldList linkType={false}>
            <ChipField source='name' />
          </SingleFieldList>
        </ReferenceArrayField>
      </SimpleForm>
    </Edit>
  );
}

export default UserEdit;
