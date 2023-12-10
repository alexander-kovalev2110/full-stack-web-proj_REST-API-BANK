import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Box from "@mui/material/Box"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"

export const HomePage = () => {
    const customerId = useSelector(state => state.custRed.customerId)
    let navigate = useNavigate()

    useEffect(() => {
        if ( customerId !== null ) {
            navigate('/trans')              // Go to page <TransPage>
        }
    }, [customerId])

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar/>
        </Box>
    )
}

export default HomePage
