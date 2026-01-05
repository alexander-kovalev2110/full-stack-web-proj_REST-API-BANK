import Box from '@mui/material/Box'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'

import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import LogoutIcon from '@mui/icons-material/Logout'

import AuthorDialog from "./AuthorDialog"
import LoadingDialog from "./LoadingDialog"
import { openAuthor } from "../store/modalSlice"
import { useAppSelector, useAppDispatch } from '../store/hook'
import { AuthorKind } from '../store/interfaces'
import { resetCust } from '../store/cust'

const NavBar: React.FC = () => {
    const { username } = useAppSelector(state => state.cust)
    const dispatch = useAppDispatch()

    return (
        <Box>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ userSelect: 'none' }}>
                    {/* LEFT */}
                    <Typography variant="h6" sx={{ flex: 1 }}>
                        REST-API-BANK
                    </Typography>

                    {/* CENTER */}
                    {username && (
                        <Typography
                            variant="h6"
                            sx={{
                            flex: 1,
                            textAlign: 'center',
                            }}
                        >
                            {username}
                        </Typography>
                    )}

                    {/* RIGHT */}
                    <Stack direction="row" spacing={1} sx={{ flex: 1, justifyContent: 'flex-end' }}>
                        {username ? (
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<LogoutIcon />}
                            onClick={() => dispatch(resetCust())}
                        >
                            Log out
                        </Button>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<LoginIcon />}
                                    onClick={() => dispatch(openAuthor(AuthorKind.Login))}
                                >
                                    Log in
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<PersonAddIcon />}
                                    onClick={() => dispatch(openAuthor(AuthorKind.Register))}
                                >
                                    Sign up
                                </Button>
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>

            <AuthorDialog />
            <LoadingDialog />

        </Box>
    )
}

export default NavBar
