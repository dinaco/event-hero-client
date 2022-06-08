import React from "react";
import { Card, CardContent, Paper, Stack, Typography } from "@mui/material";
import { Title, useGetList } from "react-admin";
import moment from "moment";

function Dashboard() {
  const { data, isLoading } = useGetList("dashboard/orders");
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
                Sales: € {data && data[0].currentMonthCompletedSales}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Qty Orders: {data && data[1].currentMonthCompletedQty}
              </Typography>
            </Paper>
            <Paper spacing={2} elevation={20}>
              <Typography py={4} px={2} variant='h6' gutterBottom>
                {moment().format("MMMM/YY")}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Open Orders: € {data && data[2].currentMonthOpenOrders}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Qty Open Orders: {data && data[3].currentMonthOpenOrdersQty}
              </Typography>
            </Paper>
            <Paper spacing={2} elevation={20}>
              <Typography py={4} px={2} variant='h6' gutterBottom>
                Overall
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Sales: € {data && data[4].allCompletedSales}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Qty Orders: {data && data[5].allCompletedQty}
              </Typography>
            </Paper>
            <Paper spacing={2} elevation={20}>
              <Typography py={4} px={2} variant='h6' gutterBottom>
                Overall
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Open Orders: € {data && data[6].allOpenOrders}
              </Typography>
              <Typography py={4} px={2} variant='body1' gutterBottom>
                Qty Open Orders: {data && data[7].allOpenOrdersQty}
              </Typography>
            </Paper>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
