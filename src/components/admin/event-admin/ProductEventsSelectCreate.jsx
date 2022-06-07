import * as React from "react";
import { SelectInput, useGetList, required } from "react-admin";

const ProductEventsSelectCreate = ({ source }) => {
  const { data } = useGetList("events-role");

  let choices = [];
  if (data) {
    data.map((event) => choices.push({ _id: event._id, name: event.name }));
  }
  return (
    <SelectInput
      source='eventsrole'
      choices={choices}
      optionText='name'
      optionValue='_id'
      label='Event related'
      validate={required()}
    />
  );
};

export default ProductEventsSelectCreate;
