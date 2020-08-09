import React from "react";

/**
 * Page output handling:
 * - Page changing
 * - Page size setting
 */

const Pagination = (props) => {             // Go to next/previous page - Buttons: "Previous"/"Next"
    const { pagePrevious, pageNext } = props
    return (
        <div className="column nest">
            <ul className="pager">
                <li><a onClick={pagePrevious}>&#9650;&nbsp;&nbsp; Previous</a></li>
                <li><a onClick={pageNext}>&#9660;&nbsp;&nbsp; Next</a></li>
            </ul>
        </div>
    )
}

const PageSetting = (props) => {            // Page size setting - Radio buttons
    const { pageSet, selected } = props
    return (
        <div className="column nest" style={{padding: "10px 0 0 40px"}}>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="exampleRadios1"
                       value="page1"  onChange={pageSet} checked={selected === "page1"} />
                <label className="form-check-label" htmlFor="exampleRadios1">&nbsp; Page=5</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="exampleRadios2"
                       value="page2" onChange={pageSet} checked={selected === "page2"} />
                <label className="form-check-label" htmlFor="exampleRadios2">&nbsp; Page=10</label>
            </div>
        </div>
    )
}

const Pagehend = (props) => {               // Page handling
    const { pageNext, pagePrevious, pageSet, selected } = props
    return (
        <div className="row">
            <Pagination pageNext={pageNext} pagePrevious={pagePrevious}/>
            <PageSetting pageSet={pageSet} selected={selected} />
        </div>
    )
}

export default Pagehend