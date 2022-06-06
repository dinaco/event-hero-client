import React, { useState, useEffect, useContext } from "react";
import { Admin, Resource, ListGuesser, fetchUtils } from "react-admin";
import UserList from "./UserList";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import { SupervisedUserCircleRounded } from "@mui/icons-material";
import jsonServerProvider from "ra-data-json-server";
import UserCreate from "./UserCreate";
import UserEdit from "./UserEdit";
import EventList from "./EventList";
import EventEdit from "./EventEdit";
import EventCreate from "./EventCreate";
import ProductsList from "./ProductsList";
import ProductEdit from "./ProductEdit";
import { AuthContext } from "../../context/auth.context";

function AdminPage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [dataProviderInfo, setdataProviderInfo] = useState(null);
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
          catchAll={NotFound}
          dashboard={Dashboard}
          title='Event Name!'
          basename='/admin'
          dataProvider={dataProviderInfo}>
          <Resource
            name='users'
            options={{ label: "Users" }}
            icon={SupervisedUserCircleRounded}
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />
          <Resource
            name='events'
            list={EventList}
            edit={EventEdit}
            create={EventCreate}
          />
          <Resource name='products' list={ProductsList} edit={ProductEdit} />
        </Admin>
      )}
    </div>
  );
}

export default AdminPage;
