import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Drawer, Toolbar} from "@mui/material"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TransDialog from "../components/TransDialog"
import TransTable from "../components/TransTable"
import NavBar from "../components/NavBar"
import store from '../index'
import { setCommand } from "../store/actions/transAction"
import { openTrans } from "../store/actions/modalWindAction"

const drawerWidth = 240

const TransPage = () => {
    let navigate = useNavigate()
    const customerId = useSelector(state => state.custRed.customerId)

    useEffect(() => {
        if ( customerId === null ) {
            navigate('/')              // Go to page <HomePage>
        }
    }, [customerId])

    const menuHandler = (command) => {
        store.dispatch(setCommand(command))
        store.dispatch(openTrans())
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar />

            <Drawer variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            'Add Transaction',
                            'Get Transaction',
                            'Get Transaction by Filter',
                            'Update Transaction',
                            'Delete Transaction'
                        ].map((command) => (
                        <ListItem key={command} disablePadding>
                            <ListItemButton onClick={() => menuHandler(command)}>
                                <ListItemText primary={command} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <TransTable />

            <TransDialog />
        </Box>
    )
}

export default TransPage
