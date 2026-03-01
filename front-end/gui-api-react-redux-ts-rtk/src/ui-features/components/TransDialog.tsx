import React, { useRef } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"

import { useAppDispatch, useAppSelector } from "../ui-types/ui-hooks"
import { TransAction } from "../ui-types/ui-actions"
import { closeTrans } from "../../store/modal/modal.slice"
import { setFilter, resetTrans } from "../../store/trans/trans.slice"

import {
  createTransaction,
  fetchTransactionById,
  fetchTransactionsByFilter,
  updateTransaction,
  deleteTransaction,
} from "../../store/trans/trans.thunks"

type FieldDef = {
  id: string
  label: string
  type: string
}

/** UI-form schema (intent → fields) */
const formSchema: Record<TransAction, FieldDef[]> = {
  [TransAction.Add]: [
    { id: "amount", label: "Amount", type: "number" },
  ],

  [TransAction.Get]: [
    { id: "transactionId", label: "Transaction ID", type: "number" },
  ],

  [TransAction.Filter]: [
    { id: "amount", label: "Amount", type: "number" },
    { id: "date", label: "Date", type: "date" },
  ],

  [TransAction.Update]: [
    { id: "transactionId", label: "Transaction ID", type: "number" },
    { id: "amount", label: "Amount", type: "number" },
  ],

  [TransAction.Delete]: [
    { id: "transactionId", label: "Transaction ID", type: "number" },
  ],
}

const TransDialog: React.FC = () => {
  const dispatch = useAppDispatch()

  const { transOpen, transAction } = useAppSelector(
    (state) => state.modal
  )

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleClose = () => dispatch(closeTrans())

  /** Collects values from inputs */
  const collectFormData = () => {
    const data: Record<string, any> = {}

    Object.entries(inputRefs.current).forEach(([key, el]) => {
      if (!el?.value) return

      if (el.type === "number") {
        const n = Number(el.value)
        if (!Number.isNaN(n)) data[key] = n
        return
      }

      data[key] = el.value
    })

    return data
  }

  /** Intent → thunk mapping */
  const submitHandlers: Record<
    TransAction,
    (data: Record<string, any>) => void
  > = {
    [TransAction.Add]: (data) =>
      dispatch(createTransaction({ amount: data.amount })),

    [TransAction.Get]: (data) =>
      dispatch(fetchTransactionById({ id: String(data.transactionId) })),

    [TransAction.Filter]: (data) => {
      dispatch(setFilter({
        amount: data.amount,
        date: data.date,
      }))

      dispatch(fetchTransactionsByFilter())
    },

    [TransAction.Update]: (data) =>
      dispatch(updateTransaction({
        id: String(data.transactionId),
        amount: data.amount,
      })),

    [TransAction.Delete]: (data) =>
      dispatch(deleteTransaction({ id: String(data.transactionId) })),
  }

  const handleSubmit = () => {
    dispatch(resetTrans())
    if (!transAction) return

    const data = collectFormData()
    submitHandlers[transAction](data)
    handleClose()
  }

  if (!transAction) return null

  return (
    <Dialog open={transOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Transaction
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {formSchema[transAction].map((field, idx) => (
          <TextField
            key={field.id}
            margin="dense"
            label={field.label}
            type={field.type}
            fullWidth
            variant="standard"
            autoFocus={idx === 0}
            inputRef={(el) => (inputRefs.current[field.id] = el)}
          />
        ))}
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransDialog
