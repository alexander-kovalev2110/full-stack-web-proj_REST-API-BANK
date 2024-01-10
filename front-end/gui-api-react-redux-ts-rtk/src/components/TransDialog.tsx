import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"
import { fetchTrans } from "../store/transSlice"
import { closeTrans } from "../store/modalSlice"
import { Command } from '../store/interfaces'
import { useAppSelector, useAppDispatch } from '../store/hook'

const TransDialog: React.FC = () => {
    const dispatch = useAppDispatch()

    const transRequest = () => {         // Request to the Transaction DB
        const payload: any = {}          // Input values for request query
        
        let el: HTMLInputElement | null
        el = document.getElementById('transactionId') as HTMLInputElement
        payload.transactionId = (el) ? el.value : ''

        el = document.getElementById('amount') as HTMLInputElement
        payload.amount = (el) ? el.value : ''

        el = document.getElementById('date') as HTMLInputElement
        payload.date = (el) ? el.value : ''

        dispatch(fetchTrans(payload))
        dispatch(closeTrans())
    }

    type InpArrType = {
        [key in (Command | '')]: any
    }

    // Array for creating the window that used to input parameters for request
    const inpData: InpArrType = {
        [Command.AddTrans] : [{ id: 'amount', label: 'Amount', type: 'number' }],
        [Command.GetTrans] : [{ id: 'transactionId', label: 'TransactionId', type: 'number' }],
        [Command.GetTransByFilter] : [{ id: 'amount', label: 'Amount', type: 'number' },
                                        { id: 'date', label: '', type: 'date' }],
        [Command.UpdateTrans] : [{ id: 'transactionId', label: 'TransactionId', type: 'number' },
                                    { id: 'amount', label: 'Amount', type: 'number' }],
        [Command.delTrans] : [{ id: 'transactionId', label: 'TransactionId', type: 'number' }],
        [''] : [],
    }

    const { transOpen } = useAppSelector(state => state.modal)
    const { command } = useAppSelector(state => state.trans)

    return (
        <Dialog open={transOpen} maxWidth="xs" fullWidth={true}
                onClose={() => dispatch(closeTrans())}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => dispatch(closeTrans())}
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
                {inpData[command].map((comm: any, index: number) => (
                    <TextField key={index}
                        margin="dense"
                        id={comm.id}
                        label={comm.label}
                        type={comm.type}
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
