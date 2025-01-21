import React from "react"

import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"

import axios from "axios"

const LoginDialog = (props) => {
    const { open, closeDialog, setCustomer, openAlert } = props

    const requestCustomer = async (method) => {           // Interacting with Customer DB
        const name = document.getElementById("name").value
        const pw = document.getElementById("pw").value
        const url = `http://127.0.0.1:8000/customer/${name}/${pw}`

        try {
            const res = await axios({method: method, url: url})
            setCustomer(res.data.customerId)
        } catch (err) {
            if (err.response.status > 400) { openAlert(err.message) }
            else { openAlert(err.response.data.errMessage) }
        }

        closeDialog()
    }

    return (
        <Dialog open={open} maxWidth="xs" fullWidth={true} onClose={closeDialog}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={closeDialog}
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
                <Button component="label" variant="outlined" startIcon={<PersonIcon />}
                        onClick={() => requestCustomer("GET")}>
                    Log in
                </Button>
                <Button component="label" variant="outlined" startIcon={<PersonAddIcon />}
                        onClick={() => requestCustomer("POST")}>
                    Sign up
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginDialog
