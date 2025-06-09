import { useSelector, useDispatch } from "react-redux"
import { useLazyQuery, useMutation } from '@apollo/client'

import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import { DialogContent } from "@mui/material"
import { TextField } from "@mui/material"
import { DialogActions } from "@mui/material"
import { Button } from "@mui/material"

import { setTrans } from "../store/transSlice"
import { closeTrans } from "../store/modalSlice"
import { openAlert } from "../store/alertSlice"
import { Command } from "../pages/TransPage"

import { GET_TRANSACTION, GET_TRANS_BY_FILTR } from "../apollo/queries"
import { ADD_TRANSACTION, UPD_TRANSACTION, DEL_TRANSACTION } from "../apollo/mutations"

export const TransDialog = () => {
    const { transOpen } = useSelector(state => state.modal)
    const { command } = useSelector(state => state.trans)
    const { customerId } = useSelector(state => state.cust)

    const dispatch = useDispatch()

    const [getTransaction, { loading, error, data }] = useLazyQuery(GET_TRANSACTION, {
        onCompleted: (data) => {
            dispatch(setTrans(data.getTransaction))
            dispatch(closeTrans()) 
        },
        onError: (error) => {
            dispatch(openAlert(error.message))
        }
    })

    const [getTransByFiltr, { bfLoading, bfError, bfData }] = useLazyQuery(GET_TRANS_BY_FILTR, {
        fetchPolicy:'cache-and-network',
        onCompleted: (bfData) => {
            dispatch(setTrans(bfData.getTransByFiltr))
            dispatch(closeTrans()) 
        },
        onError: (bfError) => {
            dispatch(openAlert(bfError.message))
        }
    })

    const [addTransaction, { atLoading, atError, atData }] = useMutation(ADD_TRANSACTION, { 
        onCompleted: (atData) => {
            dispatch(setTrans(atData.addTransaction))
            dispatch(closeTrans()) 
        },
        onError: (atError) => {
            dispatch(openAlert(atError.message))
        }
    })

    const [updTransaction, { upLoading, upError, upData }] = useMutation(UPD_TRANSACTION, { 
        onCompleted: (upData) => {
            dispatch(setTrans(upData.updTransaction))
            dispatch(closeTrans()) 
        },
        onError: (upError) => {
            dispatch(openAlert(upError.message))
        }
    })

    const [delTransaction, { dlLoading, dlError, dlLoadingData }] = useMutation(DEL_TRANSACTION, { 
        onCompleted: (dlData) => {
            dispatch(setTrans(dlData.delTransaction))
            dispatch(closeTrans()) 
        },
        onError: (dlError) => {
            dispatch(openAlert(dlError.message))
        }
    })

    const transRequest = () => {         // Interacting with Transaction DB       
        let el = document.getElementById("transactionId")
        const transactionId = (el) ? el.value : ""

        el = document.getElementById("amount")
        const amount = (el) ? el.value : ""

        el = document.getElementById("date")
        const date = (el) ? el.value : ""

        switch (command) {
            case Command.getTr:
                getTransaction({ variables: { customerId, transactionId } })
                break;

            case Command.getTrByFil:
                getTransByFiltr({ variables: { customerId, amount, date } })
                break;
            
            case Command.addTr:
                addTransaction({ variables: { customerId, amount } })
                break;

            case Command.updTr:
                updTransaction({ variables: { customerId, transactionId, amount } })
                break;

            case Command.delTr:
                delTransaction({ variables: { customerId, transactionId } })
                break;
        }
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
        <Dialog open={transOpen} maxWidth="xs" fullWidth={true}
                onClose={() => dispatch(closeTrans())}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => dispatch(closeTrans())}
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
