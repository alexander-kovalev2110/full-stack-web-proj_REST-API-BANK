import React, { useRef } from "react"
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"

import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchTrans } from "../store/actions/transAction"
import { closeTrans } from "../store/actions/modalWindAction"
import { Command } from "../store/interfaces"

const TransDialog: React.FC = () => {
  const { transOpen } = useAppSelector(state => state.modalWind)
  const command = useAppSelector(state => state.trans.command as Command)
  const dispatch = useAppDispatch()

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleClose = () => {
    dispatch(closeTrans())
  };

  const handleRequest = () => {
    const payload: any = {}
    Object.entries(inputRefs.current).forEach(([key, el]) => {
      payload[key] = el?.value || ""    })
      
    dispatch(fetchTrans(payload)) // thunk 
    handleClose()
  };

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
        Transaction Request
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
            autoFocus={idx === 0}
          />
        ))}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" startIcon={<SendIcon />} onClick={handleRequest}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransDialog
