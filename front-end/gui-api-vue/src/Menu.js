import React from 'react'
import store from './index'
import { connect } from "react-redux"
import { setIndex } from './store/actions/indexAction'
import serv_data from './services/serv_data'

/**
 * Rendering the Menu commands (the 1-st column)
 */

export const Menu = (props) => {                       // Menu list generation
    const { customerId } = props
    const rows = serv_data.map((row, index) => {      // Creating an array with menu items <li>
        const menuClass = ((index < 2) || (customerId)) ? 'act' : 'disact'
        return (
            <li key={index}>
                <a className="nav-link" className={menuClass}
                   onClick={() => store.dispatch(setIndex(index))}>{serv_data[index].title}</a>
            </li>
        )
    })

    return (
        <ul className="nav justify-content-end">
            {rows}
        </ul>
    )
}

export default connect(state => ({customerId: state.apiRed.customerId}))(Menu)
