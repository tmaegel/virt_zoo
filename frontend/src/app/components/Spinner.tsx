"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Spinner() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
      <CircularProgress />
    </Box>
  );
}
