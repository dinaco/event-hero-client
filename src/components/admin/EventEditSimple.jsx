import React from "react";
import {
  Edit,
  SimpleForm,
  required,
  BooleanInput,
  SaveButton,
  Toolbar,
} from "react-admin";

function EventEditSimple() {
  const UserEditToolbar = () => (
    <Toolbar>
      <SaveButton />
    </Toolbar>
  );

  return (
    <Edit title='Event Info'>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <BooleanInput source='takeOrders' validate={required()} />
      </SimpleForm>
    </Edit>
  );
}

export default EventEditSimple;
