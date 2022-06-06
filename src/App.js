import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminPage from "./components/admin/AdminPage";
import MyAccount from "./components/MyAccount/MyAccount";
import NotFound from "./components/pages/NotFound";
import Event from "./components/pages/Event";
import Order from "./components/Order/Order";
import OrderTake from "./components/Order/OrderTake";
import AddBalance from "./components/MyAccount/AddBalance";
import EventList from "./components/pages/EventList";
import OrderForm from "./components/pages/OrderForm";
import {
  IsCustomer,
  IsStaff,
  IsAdmin,
  IsPrivate,
} from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";
/* import IsAdmin from "./components/auth/IsAdmin"; */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderList2 from "./components/pages/OrderList2";
import TabbedAuthForm from "./components/pages/auth/TabbedAuthForm";

function App() {
  const errorHandle = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 1000,
      closeOnClick: true,
      //hideProgressBar: true,
    });
  };
  return (
    <div className='App'>
      <ToastContainer />
      <Routes>
        <Route
          path='/'
          element={
            <IsAnon>
              <Navbar />
              <TabbedAuthForm errorHandle={errorHandle} />
            </IsAnon>
          }
        />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/events/' element={<EventList />} />
        <Route
          path='/my-account/'
          element={
            <IsPrivate>
              <Navbar />
              <MyAccount />
            </IsPrivate>
          }
        />
        <Route
          path='/add-balance/'
          element={
            <IsCustomer>
              <Navbar />
              <AddBalance />
            </IsCustomer>
          }
        />
        <Route path='/event/:eventId' element={<Event />} />
        <Route
          path='/event/:eventId/order'
          element={
            <IsCustomer>
              <Navbar />
              <OrderForm />
            </IsCustomer>
          }
        />
        <Route
          path='/orders/:eventId'
          element={
            <IsPrivate>
              <Navbar />
              <OrderList2 />
            </IsPrivate>
          }
        />
        <Route
          path='/order/:orderId'
          element={
            <IsPrivate>
              <Navbar />
              <Order />
            </IsPrivate>
          }
        />
        <Route
          path='/order/process/:orderId'
          element={
            <IsStaff>
              <Navbar />
              <OrderTake />
            </IsStaff>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
