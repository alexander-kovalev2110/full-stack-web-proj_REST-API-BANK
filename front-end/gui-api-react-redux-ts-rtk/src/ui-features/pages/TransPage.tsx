import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Drawer, Toolbar} from "@mui/material"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TransDialog from "../components/TransDialog"
import TransTable from "../components/TransTable"
import NavBar from "../components/NavBar"
import { openTrans } from "../../store/modal/modal.slice"
import { TransAction } from "../../shared/ui-actions"
import { useAppSelector, useAppDispatch } from '../../shared/hook'

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

    const menuHandler = (action: TransAction) => {
        dispatch(openTrans(action))
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
                        <ListItemButton onClick={() => menuHandler(TransAction.Add)}>
                            <ListItemText primary="Add Transaction" />
                        </ListItemButton>

                        <ListItemButton onClick={() => menuHandler(TransAction.Get)}>
                            <ListItemText primary="Get Transaction" />
                        </ListItemButton>

                        <ListItemButton onClick={() => menuHandler(TransAction.Filter)}>
                            <ListItemText primary="Get Transaction by Filter" />
                        </ListItemButton>

                        <ListItemButton onClick={() => menuHandler(TransAction.Update)}>
                            <ListItemText primary="Update Transaction" />
                        </ListItemButton>

                        <ListItemButton onClick={() => menuHandler(TransAction.Delete)}>
                            <ListItemText primary="Delete Transaction" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>

            <TransTable />
            <TransDialog />
        </Box>
    )
}

export default TransPage
