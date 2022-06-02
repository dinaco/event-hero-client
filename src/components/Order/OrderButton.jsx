import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function OrderButton({ user, event }) {
  let today = moment(new Date()).format();
  if (user && moment(today.split("T")[0]).isSame(event.date.split("T")[0])) {
    return (
      <div>
        <Link to='order/'>Order</Link>
      </div>
    );
  }
}

export default OrderButton;
