import React from "react"

import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"

import axios from "axios"
import { Command } from "../pages/TransPage"

const TransDialog = (props) => {
    const { open, command, customerId, closeDialog, 
        setTrans, openAlert } = props

    const transRequest = async () => {         // Interacting with Transaction DB
        let el = document.getElementById("transactionId")
        const transactionId = (el) ? el.value : ""

        el = document.getElementById("amount")
        const amount = (el) ? el.value : ""

        el = document.getElementById("date")
        const date = (el) ? el.value : ""

        // Data for interacting with Transaction DB (method, url)
        const domen = "http://127.0.0.1:8000/transaction"
        const config = {
            [Command.addTr] : { method: "POST", url: `${domen}/${customerId}/${amount}` },
            [Command.getTr] : { method: "GET", url: `${domen}/${customerId}/${transactionId}` },
            [Command.getTrByFil] : { method: "GET", url: `${domen}/${customerId}/?amount=${amount}&date=${date}` },
            [Command.updTr] : { method: "PATCH", url: `${domen}/${customerId}/${transactionId}/${amount}` },
            [Command.delTr] : { method: "DELETE", url: `${domen}/${customerId}/${transactionId}` } 
        }

        try {
            const res = await axios(config[command])
            setTrans(res.data.transactions)
        }
        catch (err) {
            if (err.response.status > 400) { openAlert(err.message) }
            else { openAlert(err.response.data.errMessage) }
        }

        closeDialog()
    }

    // Data for creating input dialogs 
    const inpData = {
        [Command.addTr] : [{ id: "amount", label: "Amount", type: "number" }],
        [Command.getTr] : [{ id: "transactionId", label: "TransactionId", type: "number" }],
        [Command.getTrByFil] : [{ id: "amount", label: "Amount", type: "number" },
                                            { id: "date", label: "", type: "date" }],
        [Command.updTr] : [{ id: "transactionId", label: "TransactionId", type: "number" },
                                    { id: "amount", label: "Amount", type: "number" }],
        [Command.delTr] : [{ id: "transactionId", label: "TransactionId", type: "number" }],
        [""] : []
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
            {inpData[command].map((command, index) => (
                    <TextField key={index}
                        margin="dense"
                        id={command.id}
                        label={command.label}
                        type={command.type}
                        fullWidth
                        variant="standard"
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" startIcon={<SendIcon />} onClick={transRequest}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TransDialog
