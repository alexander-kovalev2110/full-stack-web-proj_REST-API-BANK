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
import type { Query } from "../store/trans/transTypes"

const TransDialog: React.FC = () => {
  const dispatch = useAppDispatch()
  const { transOpen } = useAppSelector((state) => state.modal)
  const { command } = useAppSelector((state) => state.trans)

  // Универсальный контейнер для рефов
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleClose = () => dispatch(closeTrans())

  const handleRequest = () => {
    const payload: Partial<Query> = {}
 
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
      const d = new Date(v) 
      if (!isNaN(d.getTime())) payload.date = d
      return
    }
  })

    dispatch(fetchTrans(payload as Query))
    handleClose()
  }

  // ДData for dynamic field rendering
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
