import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInOutContainer from "./components/containers";
import Navbar from "./components/Navbar";
import AdminPage from "./components/admin/AdminPage";
import MyAccount from "./components/MyAccount/MyAccount";
import NotFound from "./components/admin/NotFound";
import Event from "./components/pages/Event";
import Order from "./components/Order/Order";
import OrderPayment from "./components/Order/OrderPayment";
import AddBalance from "./components/MyAccount/AddBalance";
import EventList from "./components/pages/EventList";
import OrderForm from "./components/pages/OrderForm";
import { io } from "socket.io-client";
import IsPrivate from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <IsPrivate>
              <AdminPage />
            </IsPrivate>
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
            <IsPrivate>
              <AddBalance />
            </IsPrivate>
          }
        />
        <Route path='/event/:eventId' element={<Event />} />
        <Route
          path='/event/:eventId/order'
          element={
            <IsPrivate>
              <OrderForm />
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
          path='/order/pay/:orderId'
          element={
            <IsPrivate>
              <OrderPayment />
            </IsPrivate>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
