import React, { useState, useEffect } from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import UserList from "./UserList";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import { SupervisedUserCircleRounded } from "@mui/icons-material";
import jsonServerProvider from "ra-data-json-server";

function AdminPage() {
  const dataProvider = jsonServerProvider(
    `${process.env.REACT_APP_BASE_API_URL}/api/admin`
  );

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
      <Admin
        catchAll={NotFound}
        dashboard={Dashboard}
        title='Event Name!'
        basename='/admin'
        dataProvider={dataProvider}>
        <Resource
          name='users'
          options={{ label: "Attending" }}
          icon={SupervisedUserCircleRounded}
          list={UserList}
        />
        <Resource name='events' list={ListGuesser} />
      </Admin>
    </div>
  );
}

export default AdminPage;
