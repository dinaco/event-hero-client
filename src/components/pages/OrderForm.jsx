import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Balance from "../MyAccount/Balance";

function OrderForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [total, setTotal] = useState(0);
  const arrInputs = [];
  const getToken = localStorage.getItem("authToken");
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    let newTotal = 0;
    data.map(
      (e) => (newTotal += Number(Object.values(e)[0]) * Number(e.price))
    );
    setTotal(newTotal);
  };

  const errorHandle = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
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
      .catch((err) => errorHandle(err.response.data.errorMessage));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/products/${eventId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        response.data.events[0].products.map((product) => {
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
      <ToastContainer />
      {!user && <h2>Loading...</h2>}
      {user && (
        <>
          <h2>
            Order @ {user.events[0].name} | <Balance balance={user.balance} />
          </h2>
          <img
            src={user.events[0].splashImg}
            alt={user.events[0].name}
            height='150px'
            width='100%'
          />
          {user.events[0].products.length === 0 && (
            <p>No products assigned to this event</p>
          )}
          {user.events[0].products.length > 0 &&
            // add condition to check if user is logged in to show order fields and if its the date of the event
            user.events[0].products.map((product, i) => {
              return (
                <div key={product._id}>
                  <label htmlFor={product.name}>{`${
                    product.name
                  } (€${product.price.toFixed(2)})`}</label>
                  <input
                    type='number'
                    min='0'
                    name={product._id}
                    placeholder='Quantity'
                    onChange={(event) => handleFormChange(i, event)}
                    value={inputFields[product._id]}
                    data-price={product.price}
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
