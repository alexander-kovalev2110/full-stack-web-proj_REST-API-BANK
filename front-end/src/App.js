import React, { Component } from 'react'
import Menu from './Menu'
import Form from './Form'
import PageDB from './PageDB'
import $ from '../node_modules/jquery/src/core'

// Array of commands and forms description
const rel = [
  {title: "Login",
    on_off: true,
    input1: {lbl: "Name", type: "text", id: "inputName", text: "Input Name", step:"" },
    input2: {lbl: "Password", type: "password", id: "inputPassword", text: "Input Password", step:""},
    button: {nam: "Login"},
    rest: "GET/customer/"
  },

  {title: "Add Customer",
    on_off: true,
    input1: {lbl: "Name", type: "text", id: "inputName", text: "Input Name", step:"" },
    input2: {lbl: "Password", type: "password", id: "inputPassword", text: "Input Password", step:""},
    button: {nam: "Register"},
    rest: "POST/customer/"
  },

  {title: "Add Transaction",
    on_off: false,
    input1: {lbl: "Amount", type: "number", id: "inputAmount", text: "Input Amount", step:"0.01"},
    button: {nam: "Submit"},
    rest: "POST/transaction/"
  },

  {title: "Get Transaction",
    on_off: false,
    input1: {lbl: "TransactionId", type: "number", id: "inputTransactionId", text: "Input TransactionId", step:""},
    button: {nam: "Submit"},
    rest: "GET/transaction/"
  },

  {title: "Get Transaction by Filter",
    on_off: false,
    input1: {lbl: "Amount", type: "number", id: "inputSeachAmount", text: "Input Amount", step:"0.01" },
    input2: {lbl: "Date", type: "date", id: "inputDate", text: "Input Date", step:""},
    button: {nam: "Submit"},
    rest: "GET/transaction/"
  },

  {title: "Update Transaction",
    on_off: false,
    input1: {lbl: "TransactionId", type: "number", id: "inputTransactionId", text: "Input TransactionId", step:""},
    input2: {lbl: "Amount", type: "number", id: "inputAmount", text: "Input Amount", step:"0.01"},
    button: {nam: "Submit"},
    rest: "PUT/transaction/"
  },

  {title: "Delete Transaction",
    on_off: false,
    input1: {lbl: "TransactionId", type: "number", id: "inputDelTransactionId", text: "Input TransactionId", step:""},
    button: {nam: "Submit"},
    rest: "DELETE/transaction/"
  }
]

const debugTb = [                 // Debug data from site
  { transactionId: 1, customerId: 1, amount: 500, date: "2020-06-24" },
  { transactionId: 2, customerId: 1, amount: 100, date: "2020-06-24" },
  { transactionId: 3, customerId: 1, amount: 1500, date: "2020-06-24" },
  { transactionId: 4, customerId: 1, amount: 750, date: "2020-06-24" },
  { transactionId: 5, customerId: 1, amount: 215, date: "2020-06-24" },
  { transactionId: 6, customerId: 1, amount: 950, date: "2020-06-24" },
  { transactionId: 7, customerId: 1, amount: 5950, date: "2020-06-24" },
  { transactionId: 8, customerId: 1, amount: 500, date: "2020-06-24" },
  { transactionId: 9, customerId: 1, amount: 100, date: "2020-06-24" },
  { transactionId: 10, customerId: 1, amount: 1500, date: "2020-06-24" },
  { transactionId: 11, customerId: 1, amount: 750, date: "2020-06-24" },
  { transactionId: 12, customerId: 1, amount: 215, date: "2020-06-24" },
  { transactionId: 13, customerId: 1, amount: 950, date: "2020-06-24" },
  { transactionId: 14, customerId: 1, amount: 5950, date: "2020-06-24" }
]

const adr = "C:/Users/HP/Documents/KA/Test/gui_api/OSPanel/domains/localhost/index.php/"        // Site address
let url = adr              // String with url request

/**
 * Sending a REST API request to the site and displaying the received data.
 * There are three columns on the screen:
 * - Command list menu (authorization, transactions)
 * - Form for entering command attributes
 * - Table of data received from the site
 */

class App extends Component {
  state = {
    index: 0,             // Menu item index
    customerId: 0,        // Customer authorization result
    tb: [] = debugTb      // Data received from the server
  }

  handleClick = (index) => {              // Menu command processing - form output
    this.setState({ index: index })
  }

  handleSubmit = () => {                  // Making a request and sending it to the server
    const index = this.state.index
    const rest = rel[index].rest
    const customerId = this.state.customerId
    const {input1, input2} = rel[index]

    const inpVal = (inp) => {              //  Getting the entered string
      return (document.getElementById(inp.id).value)
    }

    const error = () => { alert('Data loading Error!')}     // For ajax

    const success = (response) => {                         // For ajax
      let data = JSON.parse(response)

      if (Array.isArray(data)) {this.setState({tb: data})}
      else if (data['customerId']) {this.setState({customerId: data['customerId']})}
      else alert(data)
    }

    switch (index) {                        // Creating a string with a URL request (based on form data)
      case 0: case 1: case 5:
        url += rest + inpVal(input1) + "/" + inpVal(input2)
        break
      case 2: case 3: case 6:
        url += rest + customerId + "/" + inpVal(input1)
        break
      case 4:
        url += rest + customerId + "/?amount=" + inpVal(input1) + "&date=" + inpVal(input2)
        break
      default:
        alert("Wrong index=" + index)
    }

    $.ajax({                            // Request sending to the web-server
      url: url,
      error: error,
      success: success
    })
  }

  render() {
    return (
        <div className="row">
            <div className="column" id="wc1">
                <Menu arr={rel} handleClick={this.handleClick} />
            </div>
            <div className="column" id="wc2">
                <Form dataForm={rel[this.state.index]} handleSubmit={this.handleSubmit} />
            </div>
            <div className="column" id="wc3">
                <PageDB dbData={this.state.tb} />
            </div>
        </div>
    )
  }
}

export default App
