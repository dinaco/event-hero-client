import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInOutContainer from "./components/containers";
import Navbar from "./components/Navbar";
import AdminPage from "./components/admin/AdminPage";
import MyAccount from "./components/MyAccount/MyAccount";
import NotFound from "./components/admin/NotFound";
import Event from "./components/pages/Event";
import Order from "./components/Order/Order";
import OrderTake from "./components/Order/OrderTake";
import AddBalance from "./components/MyAccount/AddBalance";
import EventList from "./components/pages/EventList";
import OrderForm from "./components/pages/OrderForm";
import { io } from "socket.io-client";
import {
  IsCustomer,
  IsStaff,
  IsAdmin,
  IsPrivate,
} from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderList from "./components/pages/OrderList";
import OrderProcessing from "./components/pages/OrderProcessing";

function App() {
  const errorHandle = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };

  const socket = io("http://localhost:3000", {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });
  return (
    <div className='App'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <IsAnon>
              <SignInOutContainer errorHandle={errorHandle} />
            </IsAnon>
          }
        />
        <Route
          path='/admin/*'
          element={
            <IsAdmin>
              <AdminPage />
            </IsAdmin>
          }
        />
        <Route path='/events/' element={<EventList />} />
        <Route
          path='/my-account/'
          element={
            <IsPrivate>
              <MyAccount />
            </IsPrivate>
          }
        />
        <Route
          path='/add-balance/'
          element={
            <IsCustomer>
              <AddBalance />
            </IsCustomer>
          }
        />
        <Route path='/event/:eventId' element={<Event />} />
        <Route
          path='/event/:eventId/order'
          element={
            <IsCustomer>
              <OrderForm />
            </IsCustomer>
          }
        />
        <Route
          path='/orders/:eventId'
          element={
            <IsPrivate>
              <OrderList />
            </IsPrivate>
          }
        />
        <Route
          path='/order/:orderId'
          element={
            <IsPrivate>
              <Order />
            </IsPrivate>
          }
        />
        <Route
          path='/order/process/:orderId'
          element={
            <IsStaff>
              <OrderTake />
            </IsStaff>
          }
        />
        <Route
          path='/order/status/:orderId'
          element={
            <IsStaff>
              <OrderProcessing />
            </IsStaff>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
