import React from "react";

/**
 * Outputting the database table:
 * - Displaying the table header
 * - Displaying the table body
 */

const TableHeader = () => {         // Table header displaying
    return (
        <thead>
        <tr>
            <th scope="col">TransactionId</th>
            <th scope="col">CustomerId</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
        </tr>
        </thead>
    )
}

const TableBody = (props) => {        // Generation of DB-table
    const {dbData} = props
    let rows = dbData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.transactionId}</td>
                <td>{row.customerId}</td>
                <td>{row.amount}</td>
                <td>{row.date}</td>
            </tr>
        )
    })
    const {offset, page} = props.pageState
    // Selection from the table of the output page
    rows = rows.filter((el, index) => ((index >= offset) && (index < offset + page)))

    return ( <tbody id="db_tab">{rows}</tbody> )
}

const Table = (props) => {                  // Database table displaying
    const { dbData, pageState } = props

    return (
        <table className="table">
            <TableHeader />
            <TableBody dbData={dbData} pageState={pageState}/>
        </table>
    )
}

export default Table
