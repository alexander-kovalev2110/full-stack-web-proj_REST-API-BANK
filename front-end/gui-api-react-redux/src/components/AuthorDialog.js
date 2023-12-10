import React from 'react'
import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"
import store from "../index"
import { closeAuthor } from "../store/actions/modalWindAction"
import { fetchCust } from "../store/actions/custAction"
import { connect } from "react-redux"

export const AuthorDialog = (props) => {
    const { open, authorKind } = props

    const requestCustomer = (authorKind) => {        // Interacting with Customer DB
        const name = document.getElementById("name").value
        const pw = document.getElementById("pw").value

        store.dispatch(closeAuthor())
        store.dispatch(() => fetchCust(authorKind, name, pw))
    }

    return (
        <Dialog open={open} maxWidth="xs" fullWidth={true}
                onClose={() => store.dispatch(closeAuthor())}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => store.dispatch(closeAuthor())}
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
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="pw"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                {
                    (authorKind === 'Login')? (
                            <Button component="label" variant="outlined" startIcon={<LoginIcon />}
                                onClick={() => requestCustomer(authorKind)}>
                                Log in
                            </Button>
                    ) : (
                        <Button component="label" variant="outlined" startIcon={<PersonAddIcon />}
                            onClick={() => requestCustomer(authorKind)}>
                            Sign up
                        </Button>
                    )
                }
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    open: state.modalWindRed.authorOpen,
    authorKind: state.modalWindRed.authorKind
})

export default connect(mapStateToProps)(AuthorDialog)