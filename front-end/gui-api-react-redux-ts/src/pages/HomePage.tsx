import { useEffect } from "react"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import Box from "@mui/material/Box"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import { RootState } from "../store/reducers/index"

const HomePage: React.FC = () => {
    const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector
    const  { customerId } = useTypeSelector(state => state.cust)
    let navigate = useNavigate()

    useEffect(() => {
        if ( customerId !== null ) {        // Go to page <TransPage>
            navigate('/trans')            
        }
    }, [customerId])

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar/>
        </Box>
    )
}

export default HomePage
