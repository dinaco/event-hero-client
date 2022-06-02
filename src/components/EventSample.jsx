import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Event() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [products, setProducts] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const arrInputs = [];

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
        inputFields
      )
      .then((response) => {
        navigate(`/order/${response.data._id}`);
      })
      .catch((err) => console.log(err));
  };

  const endPointsGet = [
    `${process.env.REACT_APP_BASE_API_URL}/api/order/${eventId}`,
    `${process.env.REACT_APP_BASE_API_URL}/api/products`,
  ];

  useEffect(() => {
    axios
      .all(endPointsGet.map((endpoint) => axios.get(endpoint)))
      .then((response) => {
        setEvent(response[0].data);
        setProducts(response[1].data);
        response[1].data.map((product) => {
          // inputKeyObj[product._id] = 0;
          console.log(product);
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
          <h2>Welcome to, {event.name}</h2>
          <img
            src={event.splashImg}
            alt={event.name}
            height='150px'
            width='100%'
          />
          {
            // add condition to check if user is logged in to show order fields and if its the date of the event
            products.map((product, i) => {
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
                    data-totalitem={product.price}
                  />
                </div>
              );
            })
          }

          <button onClick={handleSubmit}>Order</button>
        </>
      )}
    </div>
  );
}

export default Event;
