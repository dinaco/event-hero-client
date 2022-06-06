import * as React from "react";
import { useRecordContext, SelectInput, useGetList } from "react-admin";

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
    />
  );
};

export default ProductEventsSelect;
