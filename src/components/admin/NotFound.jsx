import React from "react";
import { Card, CardContent } from "@mui/material";
import { Title } from "react-admin";

function NotFound() {
  return (
    <Card>
      <Title title='Not Found' />
      <CardContent>
        <h1>404: Page not found</h1>
      </CardContent>
    </Card>
  );
}

export default NotFound;
