import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInOutContainer from "./components/containers";
import AdminPage from "./components/admin/AdminPage";
import MyEvents from "./components/MyEvents";
import NotFound from "./components/admin/NotFound";
import Event from "./components/Event";
import Order from "./components/Order";
import OrderPayment from "./components/OrderPayment";
import { io } from "socket.io-client";

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
      <Routes>
        <Route path='/' element={<SignInOutContainer />} />
        <Route path='/admin/*' element={<AdminPage />} />
        <Route path='/my-events/' element={<MyEvents />} />
        <Route path='/event/:eventId' element={<Event />} />
        <Route path='/order/:orderId' element={<Order />} />
        <Route path='/order/pay/:orderId' element={<OrderPayment />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
