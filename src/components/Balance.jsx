import React from "react";
import { Link } from "react-router-dom";
import AddCardIcon from "@mui/icons-material/AddCard";

function Balance({ balance }) {
  return (
    <div>
      <h3>
        Your balance is €{balance.toFixed(2)} |{" "}
        <Link to={`/add-balance`}>
          <AddCardIcon />
        </Link>
      </h3>
    </div>
  );
}

export default Balance;
