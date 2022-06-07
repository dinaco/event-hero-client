import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Admin, Resource, fetchUtils } from "react-admin";
import UserList from "./UserList";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import { SupervisedUserCircleRounded } from "@mui/icons-material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import jsonServerProvider from "ra-data-json-server";
import UserCreate from "./UserCreate";
import UserEdit from "./UserEdit";
import EventList from "./EventList";
import EventListSimple from "./EventListSimple";
import EventEdit from "./EventEdit";
import EventEditSimple from "./EventEditSimple";
import EventCreate from "./EventCreate";
import ProductsList from "./ProductsList";
import ProductEdit from "./ProductEdit";
import ProductCreate from "./ProductCreate";
import StaffList from "./event-admin/StaffList";
import StaffCreate from "./event-admin/StaffCreate";
import StaffEdit from "./event-admin/StaffEdit";
import CustomLayout from "./CustomLayout";

function AdminPage() {
  const [dataProviderInfo, setdataProviderInfo] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const httpClient = (url, options = {}) => {
      if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
      }
      const token = localStorage.getItem("authToken");
      options.headers.set("Authorization", `Bearer ${token}`);
      return fetchUtils.fetchJson(url, options);
    };
    // const getToken = localStorage.getItem("authToken");
    setdataProviderInfo(
      jsonServerProvider(
        `${process.env.REACT_APP_BASE_API_URL}/api/admin`,
        httpClient
      )
    );
  }, []);

  // console.log(dataProvider);
  /*   const [users, setUsers] = useState([]);

  const usersEvent = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/api/admin/users`
    );
    setUsers(response);
    console.log(response);
  };

  useEffect(() => {
    usersEvent();
  }, []); */

  return (
    <div>
      {dataProviderInfo && (
        <Admin
          layout={CustomLayout}
          catchAll={NotFound}
          dashboard={Dashboard}
          basename='/admin'
          dataProvider={dataProviderInfo}>
          {user && user.role === "app-admin" && (
            <Resource
              name='users'
              options={{ label: "Users" }}
              icon={SupervisedUserCircleRounded}
              list={UserList}
              edit={UserEdit}
              create={UserCreate}
            />
          )}
          {user && user.role === "event-admin" && (
            <Resource
              name='staff'
              options={{ label: "Staff" }}
              icon={SupervisedUserCircleRounded}
              list={StaffList}
              edit={StaffEdit}
              create={StaffCreate}
            />
          )}
          {user && user.role === "app-admin" && (
            <Resource
              name='events'
              list={EventList}
              icon={LocalFireDepartmentIcon}
              edit={EventEdit}
              create={EventCreate}
            />
          )}
          {user && user.role === "event-admin" && (
            <Resource
              name='events-role'
              options={{ label: "Events" }}
              icon={LocalFireDepartmentIcon}
              list={EventListSimple}
              edit={EventEditSimple}
            />
          )}
          <Resource
            name='products'
            icon={FastfoodIcon}
            list={ProductsList}
            create={ProductCreate}
            edit={ProductEdit}
          />
        </Admin>
      )}
    </div>
  );
}

export default AdminPage;
