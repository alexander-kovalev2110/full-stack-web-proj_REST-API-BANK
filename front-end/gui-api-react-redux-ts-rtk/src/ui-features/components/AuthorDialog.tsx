import { useRef } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

import { closeAuthor } from "../../store/modal/modal.slice"
import { loginCust, registerCust } from "../../store/cust"
import { useAppDispatch, useAppSelector } from "../../shared/hook"

const AuthorDialog: React.FC = () => {
  const { authorOpen } = useAppSelector(state => state.modal)
  const dispatch = useAppDispatch()

  const nameRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

  const getPayload = () => ({
    name: nameRef.current?.value || "",
    password: pwRef.current?.value || "",
  })

  const handleLogin = () => {
    dispatch(closeAuthor())
    dispatch(loginCust(getPayload()))
  }

  const handleRegister = () => {
    dispatch(closeAuthor())
    dispatch(registerCust(getPayload()))
  }

  return (
    <Dialog
      open={authorOpen}
      maxWidth="xs"
      fullWidth
      onClose={() => dispatch(closeAuthor())}
    >
      <DialogTitle>
        Authorization
        <IconButton
          onClick={() => dispatch(closeAuthor())}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          inputRef={nameRef}
          margin="dense"
          label="Name"
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
          startIcon={<LoginIcon />}
          onClick={handleLogin}
        >
          Log in
        </Button>

        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          onClick={handleRegister}
        >
          Sign up
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthorDialog
