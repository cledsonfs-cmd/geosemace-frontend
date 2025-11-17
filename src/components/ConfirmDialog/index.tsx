import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import * as s from "./styles";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Confirmação",
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Box sx={s.dialogContent}>
          <Typography sx={s.messageText}>{message}</Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={s.dialogActions}>
        <Button onClick={onCancel} color="inherit">
          Não
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
