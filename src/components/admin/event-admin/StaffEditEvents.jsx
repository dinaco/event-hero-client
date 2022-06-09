import React from "react";
import {
  useRecordContext,
  SelectArrayInput,
  useGetList,
  required,
} from "react-admin";

const StaffEditEvents = ({ source }) => {
  // const record = useRecordContext();
  const { data } = useGetList("events-role");
  /*   let selected = [];
  if (source) {
    record[source].map((event) =>
      selected.push({ _id: event._id, name: event.name })
    );
  } */
  //TODO: default value not working, multiple choices
  return (
    <SelectArrayInput
      source='eventsrole'
      multiple
      choices={data}
      optionText='name'
      optionValue='_id'
      label='Relate Events'
      validate={required()}
    />
  );
};

export default StaffEditEvents;
