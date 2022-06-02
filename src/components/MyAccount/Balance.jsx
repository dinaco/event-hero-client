import React from "react";
import { Link } from "react-router-dom";
import AddCardIcon from "@mui/icons-material/AddCard";

function Balance({ balance }) {
  return (
    <span>
      Balance €{balance.toFixed(2)}
      <Link to={`/add-balance`}>
        <AddCardIcon />
      </Link>
    </span>
  );
}

export default Balance;
