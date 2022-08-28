import React, { useState } from 'react'
import Menu from './Menu'
import Form from './Form'
import Info from './Info'
import Table from "./Table";
import Pagehend from "./Pagehend";
import Config from './services/config'
import { PAGE1 } from './services/serv_data'
import axios from 'axios'

const App = () => {
    const [index, setIndex] = useState(0)               // Menu item index
    const [customerId, setCustomer] = useState(null)    // Customer authorization result
    const [transactions, setTrans] = useState([])       // Transactions received from the server
    const [message, setMessage] = useState('')          // error message
    const [offset, setOffset] = useState(0)             // Page offset on the screen
    const [page, setPage] = useState(PAGE1)                      // Page size

    const onClick = (index) => setIndex(index)          // Menu command processing - form output

    const onSubmit = () => {                            // request/response handling
        const config = Config(index, customerId)        // Setting config for axios

        setTrans([])            // Reset states
        setMessage('')
        setOffset(0)

        axios(config)
            .then((res) => {
                if ('customerId' in res.data) { setCustomer(res.data.customerId) }
                if ('transactions' in res.data) { setTrans(res.data.transactions) }
                if ('message' in res.data) { setMessage(res.data.message) }
            })
            .catch((err) => {
                if (err.response.status > 400) { setMessage(err.message) }
                else { setMessage(err.response.data.message) }
            })
    }

    const pageNext = () => {                      // Next page
        setOffset(((offset + page) < transactions.length)? (offset + page): offset)
    }

    const pagePrevious = () => {                  // Previous page
        setOffset(((offset - page) >= 0)? (offset - page): offset)
    }

    const pageSet = (page) => {                   // Page size selection
        setPage(page)
        setOffset(0)
    }

    return (
        <div className="row">
            <div className="column" id="wc1">
                <Menu onClick={onClick} customerId={customerId} />
            </div>
            <div className="column" id="wc2">
                <Form index={index} onSubmit={onSubmit} />
                <Info customerId={customerId} message={message} />
            </div>
            <div className="column" id="wc3">
                <Table db={transactions} offset={offset} page={page} />
                <Pagehend pageNext={pageNext} pagePrevious={pagePrevious}
                          pageSet={pageSet} page={page} />
            </div>
        </div>
    )
}

export default App
