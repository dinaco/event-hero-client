import React from "react";
import { useRecordContext, SelectArrayInput, useGetList } from "react-admin";

const StaffEditEvents = ({ source }) => {
  const record = useRecordContext();
  const { data } = useGetList(source);
  let selected = [];
  console.log(record, source);
  if (record.events) {
    if (source === "events") {
      record.events.map((event) => selected.push(event));
    } else if (source === "events-role") {
      record.events.map((event) => selected.push(event._id));
    }
  } else {
    if (source === "events") {
      record.eventsrole.map((event) => selected.push(event));
    } else if (source === "events-role") {
      record.eventsrole.map((event) => selected.push(event._id));
    }
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
