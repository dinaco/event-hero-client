import React from "react";
import {
  Edit,
  SimpleForm,
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
        <BooleanInput source='takeOrders' />
      </SimpleForm>
    </Edit>
  );
}

export default EventEditSimple;
