import React from 'react'
import { Snackbar } from "@mui/material"
import { Alert } from "@mui/material"
import store from '../index'
import { closeAlert } from "../store/actions/alertAction"
import { connect } from "react-redux"

// Displaying operating messages - success or error (severity)
export const AlertDialog = (props) => {
    const { open, errMessage } = props

    return (
        <Snackbar open={open} autoHideDuration={6000}
                  onClose={ () => store.dispatch(closeAlert()) }>
            <Alert onClose={ () =>  store.dispatch(closeAlert()) }
                   severity="error" sx={{ width: '100%', border: '1px solid' }} >
                {errMessage}
            </Alert>
        </Snackbar>
    )
}

const mapStateToProps = state => ({
    open: state.alertRed.alertOpen,
    errMessage: state.alertRed.errMessage
})

export default connect(mapStateToProps)(AlertDialog)