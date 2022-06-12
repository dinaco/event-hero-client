import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  TextInput,
  BooleanField,
  ChipField,
  SingleFieldList,
  ArrayField,
} from "react-admin";

function StaffList() {
  const userFilters = [
    <TextInput label='Search name' source='q' alwaysOn />,
    // <TextInput label='Search Email' source='q' />,
  ];

  /*   const AvatarField = ({ source }) => {
    const { data, isLoading } = useListContext();
    if (!data) return null;
    if (isLoading) return null;
    // console.log(source);
    return data.map((user) => {
      return (
        <Avatar
          src={`${user.profileImg}?size=25x25`}
          style={{ width: parseInt(25, 10), height: parseInt(25, 10) }}
          sx={{ width: 25, height: 25 }}
        />
      );
    });
  }; */

  return (
    <List filters={userFilters}>
      <Datagrid rowClick='edit'>
        <TextField source='name' />
        <EmailField source='email' />
        <ChipField source='role' />
        <ArrayField label='Attending Events' source='events'>
          <SingleFieldList linkType={false}>
            <ChipField source='name' />
          </SingleFieldList>
        </ArrayField>
        <BooleanField source='active' />
      </Datagrid>
    </List>
  );
}

export default StaffList;
