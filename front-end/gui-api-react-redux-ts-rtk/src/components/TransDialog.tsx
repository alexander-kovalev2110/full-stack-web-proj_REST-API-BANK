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

import { fetchTrans } from "../store/trans"
import { closeTrans } from "../store/modalSlice"
import { Command } from "../store/interfaces"
import { useAppSelector, useAppDispatch } from "../store/hook"
import type { TransQuery } from "../store/trans/transTypes"

const TransDialog: React.FC = () => {
  const dispatch = useAppDispatch()
  const { transOpen } = useAppSelector((state) => state.modal)
  const { command } = useAppSelector((state) => state.trans)

  // Container for refs
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleClose = () => dispatch(closeTrans())

  const handleRequest = () => {
    if (!command) return  

    const payload: TransQuery = { command }
 
    Object.entries(inputRefs.current).forEach(([key, el]) => {
      const v = el?.value
      if (!v) return

      if (key === "transactionId") {
        const n = Number(v)
        if (!Number.isNaN(n)) payload.transactionId = n
        return
      }

      if (key === "amount") {
        const n = Number(v)
        if (!Number.isNaN(n)) payload.amount = n
        return
      }

      if (key === "date") {
        payload.date = v;   // v in the format "YYYY-MM-DD"
        return;
      }

    })

    handleClose()
    dispatch(fetchTrans(payload))
  }

  // Data for dynamic field rendering
  const inpData: Record<Command, { id: string; label: string; type: string }[]> = {
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
  }

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
        {command && inpData[command].map((field, idx) => (
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
