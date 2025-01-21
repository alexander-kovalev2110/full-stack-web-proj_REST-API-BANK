import { useState } from "react"
import Box from "@mui/material/Box"
import { AppBar } from "@mui/material"
import { Toolbar } from "@mui/material"
import { Typography } from "@mui/material"
import { Button } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"

import LoginDialog from "../components/LoginDialog"

const NavBar = (props) => {
    const {customerId, setCustomer, openAlert} = props

    // state to control <LoginDialog> modal window
    const [loginOpen, setLoginOpen] = useState(false)

    return (
        <Box>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        REST-API-BANK
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {(customerId)? `Customer ${customerId}` : ""}
                    </Typography>
                    <Button component="label" variant="outlined" startIcon={<LoginIcon />}
                            color="inherit" onClick={() => setLoginOpen(true)}>
                        Log in
                    </Button>
                </Toolbar>
            </AppBar>

            <LoginDialog open={loginOpen} closeDialog={() => setLoginOpen(false)}
                         setCustomer={setCustomer} openAlert={openAlert} />
        </Box>
    )
}

export default NavBar
