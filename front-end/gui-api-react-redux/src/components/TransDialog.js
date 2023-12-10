import React from 'react'
import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"
import { connect } from "react-redux"
import { fetchTrans } from "../store/actions/transAction"
import store from "../index"
import { closeTrans } from "../store/actions/modalWindAction"

export const TransDialog = (props) => {
    const { open, command } = props

    const transRequest = () => {         // Interacting with Transaction DB
        const payload = {}      // Input values for request (for creating url)
        
        let el = document.getElementById('transactionId')
        payload.transactionId = (el) ? el.value : ''

        el = document.getElementById('amount')
        payload.amount = (el) ? el.value : ''

        el = document.getElementById('date')
        payload.date = (el) ? el.value : ''

        store.dispatch(() => fetchTrans(payload))
        store.dispatch(closeTrans())
    }

        // Data for creating input dialogs 
        const inpData = {
            ['Add Transaction'] : [{ id: 'amount', label: 'Amount', type: 'number' }],
            ['Get Transaction'] : [{ id: 'transactionId', label: 'TransactionId', type: 'number' }],
            ['Get Transaction by Filter'] : [{ id: 'amount', label: 'Amount', type: 'number' },
                                                { id: 'date', label: '', type: 'date' }],
            ['Update Transaction'] : [{ id: 'transactionId', label: 'TransactionId', type: 'number' },
                                        { id: 'amount', label: 'Amount', type: 'number' }],
            ['Delete Transaction'] : [{ id: 'transactionId', label: 'TransactionId', type: 'number' }],
            [''] : []
        }

    return (
        <Dialog open={open} maxWidth="xs" fullWidth={true}
                onClose={() => store.dispatch(closeTrans())}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => store.dispatch(closeTrans())}
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

const mapStateToProps = state => ({
    open: state.modalWindRed.transOpen,
    command: state.transRed.command
})

export default connect(mapStateToProps)(TransDialog)