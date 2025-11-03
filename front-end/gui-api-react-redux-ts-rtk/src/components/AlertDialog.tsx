import { Snackbar, Alert } from "@mui/material"
import { useAppSelector, useAppDispatch } from '../store/hook'
import { closeAlert } from '../store/alertSlice'

// Displaying operating messages - success or error (severity)
const AlertDialog: React.FC = () => {
    const { alertOpen, errMessage } = useAppSelector(state => state.alert)
    const dispatch = useAppDispatch()

    return (
        <Snackbar open={alertOpen} autoHideDuration={6000}
                  onClose={ () => dispatch(closeAlert()) }>
            <Alert onClose={ () => dispatch(closeAlert()) }
                   severity="error" sx={{ width: '100%', border: '1px solid' }} >
                {errMessage}
            </Alert>
        </Snackbar>
    )
}

export default AlertDialog
