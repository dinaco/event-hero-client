import React, { useState } from "react";
import {
  Avatar,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";

function IncDecField() {
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <TextField
        value={value}
        label='Add Amount'
        onChange={handleChange}
        variant='outlined'
        type='number'
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: { min: 0 },
          startAdornment: (
            <InputAdornment position='start'>
              <EuroIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default IncDecField;
