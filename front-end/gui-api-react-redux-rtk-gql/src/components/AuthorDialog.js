import { useSelector, useDispatch } from "react-redux"
import { useLazyQuery, useMutation } from '@apollo/client';

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

import { closeAuthor } from "../store/modalSlice"
import { openAlert } from "../store/alertSlice"
import { resetTrans } from "../store/transSlice"
import { authorCustomer} from "../store/custSlice"
import { GET_CUSTOMER } from "../apollo/queries"
import { ADD_CUSTOMER } from "../apollo/mutations"

export const AuthorDialog = () => {
    const { authorOpen, authorKind } = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [getCustomer, { loading, error, data }] = useLazyQuery(GET_CUSTOMER, {
        onCompleted: (data) => {
            dispatch(authorCustomer(data.getCustomer.customerId))
            dispatch(resetTrans()) 
        },
        onError: (error) => {
            dispatch(openAlert(error.message))
        }
    })

    const [addCustomer, { loading: acLoading, error: acError, data: acData }] = useMutation(ADD_CUSTOMER, { 
        onCompleted: (acData) => {
            dispatch(authorCustomer(acData.addCustomer.customerId))
            dispatch(resetTrans()) 
        },
        onError: (acError) => {
            dispatch(openAlert(acError.message))
        }
    })

    const requestCustomer = () => {  
        const name = document.getElementById("name").value
        const pw = document.getElementById("pw").value

        getCustomer({ variables: { name, pw } })
        dispatch(closeAuthor())
    }

    const createCustomer = () => {  
        const name = document.getElementById("name").value
        const pw = document.getElementById("pw").value
   
        addCustomer({ variables: { name, pw } })
        dispatch(closeAuthor())
    }

    return (
        <Dialog open={authorOpen} maxWidth="xs" fullWidth={true}
                onClose={() => dispatch(closeAuthor())}>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => dispatch(closeAuthor())}
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
                {
                    (authorKind === "Login")? (
                            <Button component="label" variant="outlined" startIcon={<LoginIcon />}
                                onClick={requestCustomer}>
                                Log in
                            </Button>
                    ) : (
                        <Button component="label" variant="outlined" startIcon={<PersonAddIcon />}
                            onClick={createCustomer}>
                            Sign up
                        </Button>
                    )
                }
            </DialogActions>
        </Dialog>
    )
}

export default AuthorDialog
