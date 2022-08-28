import React from "react"
import { PAGE1, PAGE2 } from './services/serv_data'

/**
 * Page output handling:
 * - Page changing
 * - Page size setting
 */

const Pagination = (props) => {             // Go to next/previous page - Buttons: "Previous"/"Next"
    const { pagePrevious, pageNext } = props
    return (
        <div className="column nest" className="col-sm-6">
            <ul className="pager">
                <li><a onClick={pagePrevious}>&#9650;&nbsp;&nbsp; Previous</a></li>
                <li><a onClick={pageNext}>&#9660;&nbsp;&nbsp; Next</a></li>
            </ul>
        </div>
    )
}

const PageSetting = (props) => {            // Page size setting - Radio buttons
    const { pageSet, page } = props
    return (
        <div className="column nest" className="col-sm-6" style={{padding: "10px 0 0 40px"}}>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="rad1"
                       onChange={() => {pageSet(PAGE1)}} checked={page === PAGE1} />
                <label className="form-check-label" htmlFor="rad1">&nbsp; Page=5</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="rad2"
                       onChange={() => {pageSet(PAGE2)}} checked={page === PAGE2} />
                <label className="form-check-label" htmlFor="rad2">&nbsp; Page=10</label>
            </div>
        </div>
    )
}

const Pagehend = (props) => {               // Page handling
    const { pageNext, pagePrevious, pageSet, page } = props
    return (
        <div className="row">
            <Pagination pageNext={pageNext} pagePrevious={pagePrevious}/>
            <PageSetting pageSet={pageSet} page={page} />
        </div>
    )
}

export default Pagehend
