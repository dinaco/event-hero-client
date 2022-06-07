import React from "react";
import { Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import { Title, useGetList } from "react-admin";
import moment from "moment";

function Dashboard() {
  const { data, isLoading } = useGetList("orders");
  if (isLoading) return null;

  return (
    <Card>
      <Title title='Dashboard' />
      <CardContent>
        <Stack
          py={4}
          px={2}
          spacing={2}
          direction='row'
          justifyContent='space-between'
          alignItems='center'>
          <Stack
            py={4}
            px={2}
            spacing={2}
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <Paper spacing={2} elevation={20}>
              <Typography py={4} px={2} variant='h6' gutterBottom>
                {moment().format("MMMM/YY")}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Sales: €{" "}
                {data &&
                  data
                    .filter(
                      (order) =>
                        moment(order.createdAt).isSame(new Date(), "month") &&
                        order.status === "completed"
                    )
                    .reduce((sum, amount) => sum + Number(amount.total), 0)
                    .toFixed(2)}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Qty Orders:{" "}
                {data &&
                  data.filter(
                    (order) =>
                      moment(order.createdAt).isSame(new Date(), "month") &&
                      order.status === "completed"
                  ).length}
              </Typography>
            </Paper>
            <Paper spacing={2} elevation={20}>
              <Typography py={4} px={2} variant='h6' gutterBottom>
                {moment().format("MMMM/YY")}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Open Orders: €{" "}
                {data &&
                  data
                    .filter(
                      (order) =>
                        moment(order.createdAt).isSame(new Date(), "month") &&
                        order.status !== "completed"
                    )
                    .reduce((sum, amount) => sum + Number(amount.total), 0)
                    .toFixed(2)}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Qty Open Orders:{" "}
                {data &&
                  data.filter(
                    (order) =>
                      moment(order.createdAt).isSame(new Date(), "month") &&
                      order.status !== "completed"
                  ).length}
              </Typography>
            </Paper>
            <Paper spacing={2} elevation={20}>
              <Typography py={4} px={2} variant='h6' gutterBottom>
                Overall
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Sales: €{" "}
                {data &&
                  data
                    .filter((order) => order.status === "completed")
                    .reduce((sum, amount) => sum + Number(amount.total), 0)
                    .toFixed(2)}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Total Sales: €{" "}
                {data &&
                  data.filter((order) => order.status === "completed").length}
              </Typography>
            </Paper>
            <Paper spacing={2} elevation={20}>
              <Typography py={4} px={2} variant='h6' gutterBottom>
                Overall
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Open Orders: €{" "}
                {data &&
                  data
                    .filter((order) => order.status !== "completed")
                    .reduce((sum, amount) => sum + Number(amount.total), 0)
                    .toFixed(2)}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Qty Open Orders:{" "}
                {data &&
                  data.filter((order) => order.status !== "completed").length}
              </Typography>
            </Paper>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
