import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  useEditContext,
  required,
  NumberInput,
  BooleanInput,
  ChipField,
  minValue,
} from "react-admin";
import { Avatar } from "@mui/material";

function ProductEdit() {
  const validatePrice = [required(), minValue(0)];

  const StyledAvatar = () => {
    const { record, isLoading } = useEditContext();
    if (isLoading) return null;
    return (
      <Avatar
        sx={{ width: 112, height: 112 }}
        src={record.productImg}
        alt={record.name}
      />
    );
  };

  return (
    <Edit title='Product Info'>
      <SimpleForm label='products' path='products'>
        <TextInput source='name' validate={required()} />
        <StyledAvatar />
        <ImageInput
          source='productImg'
          label='Change image'
          accept='image/*'></ImageInput>
        <TextInput source='manufacturer' validate={required()} />
        <NumberInput
          source='price'
          min={0}
          options={{ style: "currency", currency: "EUR" }}
          validate={validatePrice}
        />
        <BooleanInput source='active' />
        <ChipField source='event.name' />
      </SimpleForm>
    </Edit>
  );
}

export default ProductEdit;
