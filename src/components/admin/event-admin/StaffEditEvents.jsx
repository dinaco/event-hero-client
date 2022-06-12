import React from "react";
import { useRecordContext, SelectArrayInput, useGetList } from "react-admin";

const StaffEditEvents = ({ source }) => {
  const record = useRecordContext();
  const { data } = useGetList("events-role");
  let selected = [];
  if (source === "users") {
    record.events.map((event) => selected.push(event));
  } else if (source === "staff") {
    record.events.map((event) => selected.push(event._id));
  }
  return (
    <SelectArrayInput
      source='eventsrole'
      multiple
      choices={data}
      optionText='name'
      optionValue='_id'
      label='Related Events'
      defaultValue={selected}
    />
  );
};

export default StaffEditEvents;
