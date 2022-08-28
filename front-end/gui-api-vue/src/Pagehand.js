import React from "react"
import { connect } from "react-redux"
import store from "./index"
import { PAGE1, PAGE2 } from './services/serv_data'
import { previousPage, nextPage, setPage } from "./store/actions/pageAction"

/**
 * Page output handling:
 * - Page changing
 * - Page size setting
 */

export const Pagehand = (props) => {               // Page handling
    const { page } = props
    return (
        <div className="row">

            {/* Go to next/previous page - Buttons: "Previous"/"Next" */}
            <div className="column nest" className="col-sm-6">
                <ul className="pager">
                    <li><a onClick={() => store.dispatch(previousPage())}>&#9650;&nbsp;&nbsp; Previous</a></li>
                    <li><a onClick={() => store.dispatch(nextPage())}>&#9660;&nbsp;&nbsp; Next</a></li>
                </ul>
            </div>

            {/* Page size setting - Radio buttons */}
            <div className="column nest" className="col-sm-6" style={{padding: "10px 0 0 40px"}}>
                <div className="form-check">
                    <input className="form-check-input" type="radio" id="rad1"
                           onChange={() => store.dispatch(setPage(PAGE1))} checked={page === PAGE1} />
                    <label className="form-check-label" htmlFor="rad1">&nbsp; Page=5</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" id="rad2"
                           onChange={() => store.dispatch(setPage(PAGE2))} checked={page === PAGE2} />
                    <label className="form-check-label" htmlFor="rad2">&nbsp; Page=10</label>
                </div>
            </div>

        </div>
    )
}

export default connect(state => ({page: state.pageRed.page}))(Pagehand)