import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInOutContainer from "./components/containers";
import Navbar from "./components/Navbar";
import AdminPage from "./components/admin/AdminPage";
import MyAccount from "./components/MyAccount";
import NotFound from "./components/admin/NotFound";
import Event from "./components/Event";
import Order from "./components/Order";
import OrderPayment from "./components/OrderPayment";
import EventList from "./components/EventList";
import { io } from "socket.io-client";
import IsPrivate from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";

function App() {
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
              <SignInOutContainer />
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
          path='/event/:eventId'
          element={
            <IsPrivate>
              <Event />
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
