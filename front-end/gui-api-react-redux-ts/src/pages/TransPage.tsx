import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { Drawer, Toolbar} from "@mui/material"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TransDialog from "../components/TransDialog"
import TransTable from "../components/TransTable"
import NavBar from "../components/NavBar"
import { RootState } from "../store/reducers/index"
import { setCommand } from "../store/actions/transAction"
import { openTrans } from "../store/actions/modalWindAction"
import { Command } from '../store/interfaces'

const drawerWidth = 240

const TransPage: React.FC = () => {
    const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector
    const  {customerId} = useTypeSelector(state => state.cust)

    let navigate = useNavigate()
    
    useEffect(() => {
        if ( customerId === null ) {
            navigate('/')              // Go to page <HomePage>
        }
    }, [customerId])
    
    const dispatch = useDispatch()
    
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
        </Box>
    )
}

export default TransPage
