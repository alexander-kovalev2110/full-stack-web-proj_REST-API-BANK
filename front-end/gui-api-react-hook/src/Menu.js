import React from 'react'
import serv_data from './services/serv_data'

/**
 * Rendering the Menu commands (the 1-st column)
 */

const Menu = (props) => {                       // Menu list generation
    const { customerId, onClick } = props
    const rows = serv_data.map((row, index) => {      // Creating an array with menu items <li>
        const menuClass = ((index < 2) || (customerId)) ? 'act' : 'disact'
        return (
            <li key={index}>
                <a className="nav-link" className={menuClass}
                   onClick={() => onClick(index)}>{serv_data[index].title}</a>
            </li>
        )
    })

    return (
        <ul className="nav justify-content-end">
            {rows}
        </ul>
    )
}

export default Menu
