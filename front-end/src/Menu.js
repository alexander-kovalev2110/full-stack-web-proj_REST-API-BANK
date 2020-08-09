import React, { Component } from 'react'

/**
 * Rendering the first column:
 * - Command menu
 */

const Menu = (props) => {                       // Menu list generation
    const {arr, handleClick} = props

    const rows = arr.map((row, index) => {      // Creating an array with menu items <li>
        return (
            <li key={index}>
                <a className="nav-link active" onClick={() => handleClick(index)}>{arr[index].title}</a>
            </li>
        )
    })

    return (
        <ul className="nav justify-content-end">{rows}</ul>
    )
}

export default Menu