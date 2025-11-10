import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Drawer, Toolbar} from "@mui/material"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TransDialog from "../components/TransDialog"
import TransTable from "../components/TransTable"
import LoadingDialog from "../components/LoadingDialog"
import NavBar from "../components/NavBar"
import { setCommand } from "../store/trans"
import { openTrans } from "../store/modalSlice"
import { Command } from '../store/interfaces'
import { useAppSelector, useAppDispatch } from '../store/hook'

const drawerWidth = 240

const TransPage: React.FC = () => {
    const  {username} = useAppSelector(state => state.cust)

    let navigate = useNavigate()
    
    useEffect(() => {
        if ( username === null ) {
            navigate('/')              // Go to page <HomePage>
        }
    }, [username])
    
    const dispatch = useAppDispatch()
    
    const menuHandler = (command: Command) => {
        dispatch(setCommand(command))
        dispatch(openTrans())
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
                        {Object.values(Command).map((comm) => (
                        <ListItem key={comm} disablePadding>
                            <ListItemButton onClick={() => menuHandler(comm)}>
                                <ListItemText primary={comm} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <TransTable />
            <TransDialog />
            <LoadingDialog />
        </Box>
    )
}

export default TransPage
