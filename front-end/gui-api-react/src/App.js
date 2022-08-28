import React, { Component } from 'react'
import Menu from './Menu'
import Form from './Form'
import Info from './Info'
import Table from './Table'
import Pagehand from './Pagehand'
import Config from './services/config'
import { PAGE1 } from './services/serv_data'
import axios from 'axios'

class App extends Component {
    state = {
        index: 0,                   // Menu item index
        customerId: null,           // Customer authorization result
        transactions: [],           // Transactions received from the server
        message: '',                // error message
        offset: 0,                  // Page offset on the screen
        page: PAGE1                 // Page size
    }

    onClick = (index) => {          // Menu command processing - form output
        this.setState({ index: index })
    }

    onSubmit = () => {                  // request/response handling
        const { index, customerId } = this.state
        const config = Config(index, customerId)      // Setting config for axios

        this.setState({ transactions: [] })     // Reset states
        this.setState({ message: '' })
        this.setState({ offset: 0 })

        axios(config)
            .then((res) => {
                if ('customerId' in res.data) { this.setState({ customerId: res.data.customerId }) }
                if ('transactions' in res.data) { this.setState({ transactions: res.data.transactions }) }
                if ('message' in res.data) { this.setState({ message: res.data.message }) }
            })
            .catch((err) => {
                if (err.response.status > 400) { this.setState({ message: err.message }) }
                else {  this.setState({ message: err.response.data.message }) }
            })
    }

    pageNext = () => {                      // Next page
        const { transactions, offset, page } = this.state
        if ((offset + page) < transactions.length)
            this.setState({offset: offset + page})
    }

    pagePrevious = () => {                  // Previous page
        const {offset, page} = this.state
        if ((offset - page) >= 0)
            this.setState({offset: offset - page})
    }

    setPage = (page) => {                   // Page size selection
        this.setState({
            offset: 0,
            page: page
        })
    }

    render() {
        const { index, customerId, transactions, message, offset, page } = this.state
        return (
            <div className="row">
                <div className="column" id="wc1">
                    <Menu onClick={this.onClick} customerId={customerId} />
                </div>
                <div className="column" id="wc2">
                    <Form index={index} onSubmit={this.onSubmit} />
                    <Info customerId={customerId} message={message} />
                </div>
                <div className="column" id="wc3">
                    <Table db={transactions} offset={offset} page={page} />
                    <Pagehand pageNext={this.pageNext} pagePrevious={this.pagePrevious}
                              setPage={this.setPage} page={page} />
                </div>
            </div>
        )
    }
}

export default App
