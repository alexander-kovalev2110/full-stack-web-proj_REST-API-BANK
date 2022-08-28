import React from 'react'
import { connect } from "react-redux"

/**
 * Current information about customer and message
 */

export const Info = (props) => {
    const { customerId, message } = props
    return (
        <dir>
            <br/><br/>
            <h5><i>CustomerId:</i> <b>{customerId}</b></h5>
            <h5><i>Message:</i> <b> {message}</b></h5>
        </dir>
    )
}

const mapStateToProps = state => ({
    customerId: state.apiRed.customerId,
    message: state.apiRed.message
})

export default connect(mapStateToProps)(Info)