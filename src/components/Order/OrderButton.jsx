import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function OrderButton({ user, event }) {
  return (
    <div>
      <Link to='order/'>Order</Link>
    </div>
  );
}

export default OrderButton;
