import React from "react";
import { Skeleton, Box } from "@mui/material";

function LoadingImg() {
  return (
    <Box my={2}>
      <Skeleton />
      <Skeleton animation='wave' />
      <Skeleton animation={false} />
    </Box>
  );
}

export default LoadingImg;
