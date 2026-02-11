import React from "react";
import { Dialog, Box, CircularProgress, Typography } from "@mui/material";
import { useAppSelector } from "../shared/hook";

const LoadingDialog: React.FC = () => {
  const { loading } = useAppSelector(state => state.ui);

  return (
    <Dialog
      open={loading}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      transitionDuration={0}
        PaperProps={{
        sx: {
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "8px",
        },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <CircularProgress size={60} />
        <Typography mt={2} variant="h6">
          Processing your request...
        </Typography>
      </Box>
    </Dialog>
  );
};

export default LoadingDialog;
