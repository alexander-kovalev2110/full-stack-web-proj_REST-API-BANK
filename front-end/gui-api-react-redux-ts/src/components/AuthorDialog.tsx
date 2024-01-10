import React from 'react'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AuthorKind } from '../store/interfaces'
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
import { closeAuthor } from "../store/actions/modalWindAction"
import { fetchCust } from "../store/actions/custAction"
import { RootState } from "../store/reducers/index"

const AuthorDialog: React.FC = () => {
    const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector
    const { authorOpen, authorKind } = useTypeSelector(state => state.modalWind)
    const dispatch = useDispatch<any>()
    
    // Interacting with Customer DB
    const requestCustomer = (authorKind: AuthorKind) => { 
        let el: HTMLInputElement | null
        el = document.getElementById("name") as HTMLInputElement
        const name: string = el.value
        
        el = document.getElementById("pw") as HTMLInputElement
        const pw: string = el.value

        dispatch(closeAuthor())
        dispatch(() => fetchCust(authorKind, name, pw))
    }

    return (
        <Dialog open={authorOpen} maxWidth="xs" fullWidth={true}
                onClose={() => dispatch(closeAuthor())}>
            <DialogTitle>
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

export default AuthorDialog
