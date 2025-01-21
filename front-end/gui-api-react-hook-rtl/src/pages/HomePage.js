import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import NavBar from "../components/NavBar"

export const HomePage = (props) => {
    const { customerId, setCustomer, openAlert} = props
    let navigate = useNavigate()

    useEffect(() => {
        if ( customerId !== null ) {
            navigate('/trans')              // Go to page <TransPage>
        }
    }, [customerId])

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar customerId={customerId} setCustomer={setCustomer}
                    openAlert={openAlert}/>
        </Box>
    )
}

export default HomePage
