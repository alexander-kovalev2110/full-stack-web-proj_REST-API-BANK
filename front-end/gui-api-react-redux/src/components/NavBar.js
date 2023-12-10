import React from 'react'
import Box from '@mui/material/Box'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import AuthorDialog from './AuthorDialog'
import store from '../index'
import { openAuthor } from "../store/actions/modalWindAction"
import { connect } from "react-redux"

export const NavBar = (props) => {
    const { customerId } = props

    return (
        <Box>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        REST-API-BANK
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        { (customerId)? `Customer ${customerId}` : '' }
                    </Typography>
                    <Stack direction="row" spacing={1} >
                        <Button component="label" variant="outlined" startIcon={<LoginIcon />}
                                color="inherit" onClick={() => store.dispatch(openAuthor('Login'))}>
                            Log in
                        </Button>
                        <Button component="label" variant="outlined" startIcon={<PersonAddIcon />}
                                color="inherit" onClick={() => store.dispatch(openAuthor('Signup'))}>
                            Sign up
                    </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            <AuthorDialog />
        </Box>
    )
}

const mapStateToProps = state => ({
    customerId: state.custRed.customerId
})

export default connect(mapStateToProps)(NavBar)