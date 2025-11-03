import { useRef } from "react"

import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

import { closeAuthor } from "../store/modalSlice"
import { openAlert } from "../store/alertSlice"
import { fetchCust } from "../store/cust"
import { useAppSelector, useAppDispatch } from '../store/hook'
import { AuthorKind } from '../store/interfaces'

const AuthorDialog: React.FC = () => {
    const { authorOpen, authorKind } = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()

    const nameRef = useRef<HTMLInputElement>(null)
    const pwRef = useRef<HTMLInputElement>(null)

    // Request to the Customer DB
    const handleRequest = (authorKind: AuthorKind) => { 
        const name = nameRef.current?.value || ""
        const pw = pwRef.current?.value || ""

        if (!name || !pw) {
            dispatch(openAlert("Name and password are required"))
            return
        }

        dispatch(closeAuthor())
        dispatch(fetchCust({ authorKind, name, pw }))
    }

    return (
        <Dialog open={authorOpen} maxWidth="xs" fullWidth={true}
                onClose={() => dispatch(closeAuthor())}>
            <DialogTitle>
                Authorization
                <IconButton
                    aria-label="close"
                    onClick={() => dispatch(closeAuthor())}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[700]
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
