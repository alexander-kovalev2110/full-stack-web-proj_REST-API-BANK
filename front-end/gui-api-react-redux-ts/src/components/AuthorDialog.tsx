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
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

import { openAlert } from "../store/actions/alertAction"
import { closeAuthor } from "../store/actions/modalWindAction"
import { fetchCust, authorType } from "../store/actions/custAction"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { AuthorKind } from "../store/interfaces"

const AuthorDialog: React.FC = () => {
  const { authorOpen, authorKind } = useAppSelector(state => state.modalWind)
  const dispatch = useAppDispatch()

  const nameRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

  const handleRequest = (kind: AuthorKind) => {
    const name = nameRef.current?.value || ""
    const pw = pwRef.current?.value || ""

  if (!name || !pw) {
    dispatch(openAlert("Name and password are required"))
    return
  }

    dispatch(closeAuthor())
    const payload:authorType = {kind, name, pw}
    dispatch(fetchCust(payload))
  };

  return (
    <Dialog open={authorOpen} onClose={() => dispatch(closeAuthor())} maxWidth="xs" fullWidth>
      <DialogTitle>
        Authorization
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeAuthor())}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[700],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          inputRef={nameRef}
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          inputRef={pwRef}
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          startIcon={authorKind === "Login" ? <LoginIcon /> : <PersonAddIcon />}
          onClick={() => handleRequest(authorKind)}
        >
          {authorKind === "Login" ? "Log in" : "Sign up"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthorDialog