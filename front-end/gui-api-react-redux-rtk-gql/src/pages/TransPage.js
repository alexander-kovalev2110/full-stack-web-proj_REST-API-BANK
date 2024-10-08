import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { Drawer, Toolbar} from "@mui/material"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

import TransDialog from "../components/TransDialog"
import TransTable from "../components/TransTable"
import NavBar from "../components/NavBar"
import { setCommand} from "../store/transSlice"
import { openTrans } from "../store/modalSlice"

const drawerWidth = 240

export const Command = {
    addTr: "Add Transaction",
    getTr: "Get Transaction",
    getTrByFil: "Get Transaction by Filter",
    updTr: "Update Transaction",
    delTr: "Delete Transaction"
}

const TransPage = () => {
    const { customerId } = useSelector(state => state.cust)
    let navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if ( customerId === null ) {
            navigate("/")              // Go to page <HomePage>
        }
    }, [customerId])

    const menuHandler = (command) => {
        dispatch(setCommand(command))
        dispatch(openTrans())
    }

    return (
        <Box sx={{ display: "flex" }}>
            <NavBar />

            <Drawer variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
                    }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {Object.values(Command).map((comm) => (
                            <ListItem key={comm} disablePadding>
                                <ListItemButton
                                    onClick={() => menuHandler(comm)}
                                >
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
