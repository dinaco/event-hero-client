import * as React from "react";
import { SelectArrayInput, useGetList, required } from "react-admin";

const StaffCreateEvents = ({ source }) => {
  const { data } = useGetList(source);
  return (
    <SelectArrayInput
      source='eventsrole'
      choices={data}
      optionText='name'
      optionValue='_id'
      label='Events related'
      validate={required()}
    />
  );
};

export default StaffCreateEvents;
