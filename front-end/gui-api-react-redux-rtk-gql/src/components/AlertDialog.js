import { useDispatch, useSelector } from "react-redux"

import { Snackbar } from "@mui/material"
import { Alert } from "@mui/material"

import { closeAlert } from "../store/alertSlice"

// Displaying operating messages - success or error (severity) 
export const AlertDialog = () => {
    const { alertOpen, errMessage } = useSelector(state => state.alert)
    const dispatch = useDispatch()

    return (
        <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={() => dispatch(closeAlert())}
        >
            <Alert
                onClose={() => dispatch(closeAlert())}
                severity="error"
                sx={{ width: "100%", border: "1px solid" }}
            >
                {errMessage}
            </Alert>
        </Snackbar>
    )
}

export default AlertDialog