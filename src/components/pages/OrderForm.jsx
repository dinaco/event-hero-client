import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Stack,
  Typography,
  Button,
  Card,
  Avatar,
  IconButton,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Balance from "../MyAccount/Balance";
import LoadingImg from "../LoadingImg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function OrderForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const arrInputs = [];
  const getToken = localStorage.getItem("authToken");
  const handleIncrement = (index) => {
    let data = [...inputFields];
    data[index][Object.keys(data[index])[0]] =
      Object.values(data[index])[0] + 1;
    setInputFields(data);
    let newTotal = 0;
    data.map(
      (e) => (newTotal += Number(Object.values(e)[0]) * Number(e.price))
    );
    setTotal(newTotal);
    setCount(count + 1);
  };

  const handleDecrement = (index) => {
    let data = [...inputFields];
    if (Object.values(data[index])[0] >= 1) {
      data[index][Object.keys(data[index])[0]] =
        Object.values(data[index])[0] - 1;
      setInputFields(data);
      let newTotal = 0;
      data.map(
        (e) => (newTotal += Number(Object.values(e)[0]) * Number(e.price))
      );
      setTotal(newTotal);
      setCount(count - 1);
    }
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
    if (count <= 0) {
      return errorHandle("Add items to your order");
    } else if (user.balance < total) {
      return errorHandle("Insuficient balance, add funds!");
    } else {
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
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/products/${eventId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        const { products, takeOrders } = response.data.events[0];
        if (takeOrders) {
          setUser(response.data);
          products.map((product) => {
            // inputKeyObj[product._id] = 0;
            arrInputs.push({
              [product._id]: 0,
              name: product.name,
              price: product.price,
            });
            // setInputFields((prev) => [...prev, inputKeyObj]);
          });
          setInputFields(arrInputs);
        } else {
          navigate(`/`);
        }
      });
  }, []);

  return (
    <div>
      <ToastContainer />
      {!user && <LoadingImg />}
      {user && (
        <Stack>
          <Stack>
            <Typography
              variant='h5'
              sx={{
                my: 2,
                alignSelf: "center",
              }}>
              Order @ {user.events[0].name}
            </Typography>
            <Balance balance={user.balance} />
          </Stack>
          {user.events[0].products.length === 0 && (
            <p>No products assigned to this event</p>
          )}
          <Card>
            <Stack
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}>
              {user.events[0].products.length > 0 &&
                // add condition to check if user is logged in to show order fields and if its the date of the event
                user.events[0].products.map((product, i) => {
                  if (product.active) {
                    return (
                      <Stack
                        key={product._id}
                        direction='row'
                        sx={{ justifyContent: "center", alignItems: "center" }}
                        spacing={1}>
                        <Stack
                          spacing={1}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}>
                          <Avatar
                            src={product.productImg}
                            name={product.name}
                          />
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}>
                            <Typography variant='body1'>
                              {product.name}
                            </Typography>
                            <Typography variant='body1'>
                              € {product.price.toFixed(2)}
                            </Typography>
                          </Stack>
                        </Stack>
                        <IconButton
                          onClick={() => handleDecrement(i)}
                          color='primary'
                          aria-label='Decrement'>
                          <RemoveCircleIcon sx={{ width: 72, height: 72 }} />
                        </IconButton>
                        <Typography
                          name={product._id}
                          px={2}
                          variant='h2'
                          component='div'
                          gutterBottom>
                          {Object.values(inputFields[i])[0]}
                        </Typography>
                        <IconButton
                          onClick={() => handleIncrement(i)}
                          color='primary'
                          aria-label='Increment'>
                          <AddCircleIcon sx={{ width: 72, height: 72 }} />
                        </IconButton>
                      </Stack>
                    );
                  }
                })}
            </Stack>
          </Card>
          <Button
            sx={{
              my: 2,
              py: 2,
              width: "100%",
            }}
            type='submit'
            variant='contained'
            onClick={handleSubmit}
            color='primary'>
            <Typography variant='h5'>Order € {total.toFixed(2)}</Typography>
          </Button>
        </Stack>
      )}
    </div>
  );
}

export default OrderForm;
