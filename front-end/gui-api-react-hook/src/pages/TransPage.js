import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Drawer, Toolbar} from "@mui/material"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TransDialog from "../components/TransDialog"
import TransTable from "../components/TransTable"
import NavBar from "../components/NavBar"

const drawerWidth = 240

const TransPage = (props) => {
    const {customerId, setCustomer, transactions, setTrans, offset, setOffset, openAlert} = props

    const [command, setCommand] = useState('')       // Menu item index

    // state to control <TransDialog> modal window
    const [transOpen, setTransOpen] = useState(false)

    let navigate = useNavigate()
    useEffect(() => {
        if ( customerId === null ) {
            navigate('/')              // Go to page <HomePage>
        }
    }, [customerId])    

    const menuHandler = (command) => {
        setCommand(command)
        setTransOpen(true)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar customerId={customerId} setCustomer={setCustomer} openAlert={openAlert}/>

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

            <TransTable transactions={transactions} offset={offset} setOffset={setOffset} />

            <TransDialog open={transOpen} command={command} customerId={customerId}
                         closeDialog={() => setTransOpen(false)}
                         setTrans={setTrans} openAlert={openAlert} />
        </Box>
    )
}

export default TransPage