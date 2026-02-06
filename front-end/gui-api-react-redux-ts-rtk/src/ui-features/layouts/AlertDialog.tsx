import { Snackbar, Alert } from "@mui/material"
import { useAppSelector, useAppDispatch } from '../../shared/hook'
import { clearError  } from '../../store/ui/ui.slice'

const AlertDialog: React.FC = () => {
    const { error } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()

    return (
        <Snackbar open={error !== null} autoHideDuration={6000}
                  onClose={ () => dispatch(clearError()) }>
            <Alert onClose={ () => dispatch(clearError()) }
                   severity="error" sx={{ width: '100%', border: '1px solid' }} >
                {error}
            </Alert>
        </Snackbar>
    )
}

export default AlertDialog
