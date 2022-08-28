import React from "react"
import { connect } from 'react-redux'

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
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {        // Generation of DB-table
    const {db, offset, page} = props

    // Selection the output page from db
    let rows = db.filter((el, index) => ((index >= offset) && (index < offset + page)))

    rows = rows.map((row, ind) => {
        return (
            <tr key={ind}>
                <td>{row.transactionId}</td>
                <td>{row.amount}</td>
                <td>{row.date}</td>
            </tr>
        )
    })

    return (
        <tbody id="db_tab">
            {rows}
        </tbody> )
}

export const Table = (props) => {                  // Database table displaying
    const { db, offset, page } = props
    return (
        <table className="table">
            <TableHeader />
            <TableBody db={db} offset={offset} page={page}/>
        </table>
    )
}

const mapStateToProps = state => ({
    db: state.apiRed.transactions,
    offset: state.pageRed.offset,
    page: state.pageRed.page
})

export default connect(mapStateToProps)(Table)
