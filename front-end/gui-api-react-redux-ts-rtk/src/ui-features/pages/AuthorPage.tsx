import { useEffect } from "react"
import Box from "@mui/material/Box"
import NavBar from "../components/NavBar"
import AuthorDialog from "../components/AuthorDialog"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from '../ui-types/ui-hooks'

const AuthorPage: React.FC = () => {
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
            
            <AuthorDialog />
        </Box>
    )
}

export default AuthorPage
