import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";
import * as s from "./styles";

interface ConfirmCorDialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  colorValue: string;
  onColorChange: (color: string) => void;
  camadaTitulo?: string;
}

const ConfirmCorDialog: React.FC<ConfirmCorDialogProps> = ({
  open,
  title,
  onConfirm,
  onCancel,
  colorValue,
  onColorChange,
  camadaTitulo,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Selecione a nova cor para: <b>{camadaTitulo}</b>
        </Typography>

        <Box sx={s.colorPickerContainer}>
          <input
            type="color"
            value={colorValue}
            onChange={(e) => onColorChange(e.target.value)}
            style={s.colorInput as React.CSSProperties}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>NÃO</Button>
        <Button variant="contained" onClick={onConfirm}>
          SIM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmCorDialog;
