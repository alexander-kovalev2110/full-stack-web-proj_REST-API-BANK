import { Snackbar } from "@mui/material"
import { Alert } from "@mui/material"
import { closeAlert } from "../store/actions/alertAction"
import { useAppDispatch, useAppSelector } from "../store/hooks"

// Displaying operating messages - success or error (severity)
const AlertDialog: React.FC = () => {
    const { alertOpen, errMessage } = useAppSelector(state => state.alert)
    const dispatch = useAppDispatch()

    return (
        <Snackbar open={alertOpen} autoHideDuration={6000}
                  onClose={ () => dispatch(closeAlert()) }>
            <Alert onClose={ () =>  dispatch(closeAlert()) }
                   severity="error" sx={{ width: '100%', border: '1px solid' }} >
                {errMessage}
            </Alert>
        </Snackbar>
    )
}

export default AlertDialog
