import Box from '@mui/material/Box'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'

import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

import AuthorDialog from "./AuthorDialog"
import LoadingDialog from "./LoadingDialog"
import { openAuthor } from "../store/modalSlice"
import { useAppSelector, useAppDispatch } from '../store/hook'

const NavBar: React.FC = () => {
    const { username } = useAppSelector(state => state.cust)
    const dispatch = useAppDispatch()

    return (
        <Box>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        REST-API-BANK
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        { (username)? `${username}` : '' }
                    </Typography>
                    <Stack direction="row" spacing={1} >
                        <Button component="label" variant="outlined" startIcon={<LoginIcon />}
                                color="inherit" onClick={() => dispatch(openAuthor('Login'))}>
                            Log in
                        </Button>
                        <Button component="label" variant="outlined" startIcon={<PersonAddIcon />}
                                color="inherit" onClick={() => dispatch(openAuthor('Signup'))}>
                            Sign up
                    </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            <AuthorDialog />
            <LoadingDialog />

        </Box>
    )
}

export default NavBar
