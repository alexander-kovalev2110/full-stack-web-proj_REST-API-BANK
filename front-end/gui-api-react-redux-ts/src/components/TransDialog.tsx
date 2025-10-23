import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/reducers";
import { fetchTrans } from "../store/actions/transAction";
import { closeTrans } from "../store/actions/modalWindAction";
import { Command } from "../store/interfaces";

const TransDialog: React.FC = () => {
  const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<any>();
  const { transOpen } = useTypeSelector((state) => state.modalWind);
  const command = useTypeSelector((state) => state.trans.command as Command);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleClose = () => {
    (document.activeElement as HTMLElement | null)?.blur();
    dispatch(closeTrans());
  };

  const handleRequest = () => {
    const payload: any = {};
    Object.entries(inputRefs.current).forEach(([key, el]) => {
      payload[key] = el?.value || "";
    });
    // dispatch(fetchTrans(payload)); // ✅ thunk напрямую
    // dispatch(() => fetchTrans(payload))
    fetchTrans(payload)
    handleClose();
  };

  useEffect(() => {
    if (transOpen) {
      const firstInput = Object.values(inputRefs.current)[0];
      setTimeout(() => firstInput?.focus(), 100);
    }
  }, [transOpen]);

  const inpData: Record<Command | "", { id: string; label: string; type: string }[]> = {
    [Command.AddTrans]: [{ id: "amount", label: "Amount", type: "number" }],
    [Command.GetTrans]: [{ id: "transactionId", label: "Transaction ID", type: "number" }],
    [Command.GetTransByFilter]: [
      { id: "amount", label: "Amount", type: "number" },
      { id: "date", label: "Date", type: "date" }
    ],
    [Command.UpdateTrans]: [
      { id: "transactionId", label: "Transaction ID", type: "number" },
      { id: "amount", label: "Amount", type: "number" }
    ],
    [Command.delTrans]: [{ id: "transactionId", label: "Transaction ID", type: "number" }],
    [""]: []
  };

  return (
    <Dialog open={transOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[700]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {inpData[command].map((field, idx) => (
          <TextField
            key={field.id}
            margin="dense"
            label={field.label}
            type={field.type}
            fullWidth
            variant="standard"
            inputRef={(el) => (inputRefs.current[field.id] = el)}
            autoFocus={idx === 0} // первый — в фокус
          />
        ))}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" startIcon={<SendIcon />} onClick={handleRequest}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransDialog;
