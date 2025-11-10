import { useEffect } from "react"
import Box from "@mui/material/Box"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from '../store/hook'

const HomePage: React.FC = () => {
    const  { username } = useAppSelector(state => state.cust)
    let navigate = useNavigate()

    useEffect(() => {
        if ( username !== null ) {        // Go to page <TransPage>
            navigate('/trans')            
        }
    }, [username])

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar/>
        </Box>
    )
}

export default HomePage
