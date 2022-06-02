import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrderForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [total, setTotal] = useState(0);
  const arrInputs = [];
  const getToken = localStorage.getItem("authToken");
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/order/${eventId}`,
        inputFields,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((response) => {
        navigate(`/order/${response.data._id}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/products/${eventId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        setEvent(response.data);
        response.data.products.map((product) => {
          // inputKeyObj[product._id] = 0;
          arrInputs.push({
            [product._id]: 0,
            name: product.name,
            price: product.price,
          });
          // setInputFields((prev) => [...prev, inputKeyObj]);
        });
        setInputFields(arrInputs);
      });
  }, []);

  return (
    <div>
      {!event && <h2>Loading...</h2>}
      {event && (
        <>
          <h2>Order @ {event.name}</h2>
          <img
            src={event.splashImg}
            alt={event.name}
            height='150px'
            width='100%'
          />
          {event.products.length === 0 && (
            <p>No products assigned to this event</p>
          )}
          {event.products.length > 0 &&
            // add condition to check if user is logged in to show order fields and if its the date of the event
            event.products.map((product, i) => {
              return (
                <div key={product._id}>
                  <label
                    htmlFor={
                      product.name
                    }>{`${product.name} (€${product.price})`}</label>
                  <input
                    type='number'
                    min='0'
                    name={product._id}
                    placeholder='Quantity'
                    onChange={(event) => handleFormChange(i, event)}
                    value={inputFields[product._id]}
                  />
                </div>
              );
            })}
          <p>Order total €{total.toFixed(2)}</p>
          <button onClick={handleSubmit}>Order</button>
        </>
      )}
    </div>
  );
}

export default OrderForm;
