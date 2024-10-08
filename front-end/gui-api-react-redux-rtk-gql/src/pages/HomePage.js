import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import Box from "@mui/material/Box"

import NavBar from "../components/NavBar"

const HomePage = () => {
    const { customerId } = useSelector(state => state.cust)
    let navigate = useNavigate()

    useEffect(() => {
        if ( customerId !== null ) {
            navigate("/trans")              // Go to page <TransPage>
        }
    }, [customerId])

    return (
        <Box sx={{ display: "flex" }}>
            <NavBar/>
        </Box>
    )
}

export default HomePage
