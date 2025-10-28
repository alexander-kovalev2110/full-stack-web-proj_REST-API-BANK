import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { Snackbar } from "@mui/material"
import { Alert } from "@mui/material"
import { closeAlert } from "../store/actions/alertAction"
import { RootState } from "../store"

// Displaying operating messages - success or error (severity)
const AlertDialog: React.FC = () => {
    const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector
    const { alertOpen, errMessage } = useTypeSelector(state => state.alert)

    const dispatch = useDispatch()

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
