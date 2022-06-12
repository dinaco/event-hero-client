import React from "react";
import {
  useRecordContext,
  SelectInput,
  useGetList,
  required,
} from "react-admin";

const ProductEventsSelect = ({ source }) => {
  const { data } = useGetList("events-role");

  let choices = [];
  if (data) {
    data.map((event) => choices.push({ _id: event._id, name: event.name }));
  }
  const record = useRecordContext();
  return (
    <SelectInput
      source='eventsrole'
      choices={choices}
      optionText='name'
      optionValue='_id'
      label='Event related'
      defaultValue={record[source]._id}
      validate={required()}
    />
  );
};

export default ProductEventsSelect;
