import React, { useState } from 'react'
import { Routes,  Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TransPage from './pages/TransPage'
import AlertDialog from "./components/AlertDialog"

const App = () => {
    //---- States to control <AlertDialog> modal window ---------------
    const [alertOpen, setAlertOpen] =  useState(false)      // to open/close <AlertDialog> window
    const [errMessage, setErrMessage] = useState("")        // message text for <AlertDialog>

    const openAlert = (message) => {
        setAlertOpen(true)
        setErrMessage(message)
    }
    const closeAlert = () => {
        setAlertOpen(false)
    }
    //---------- Component States -------------------
    const [customerId, setCustomer] = useState(null)    // Customer authorization result
    const [transactions, setTrans] = useState([])       // Transactions received from server
    const [offset, setOffset] = useState(0)             // Page offset on transactions table

    const resetCustomer = (customer) => {   // State reset on Customer change
        setCustomer(customer)
        resetTrans([])
    }

    const resetTrans = (transactions) => {  // State reset on Transaction change
        setTrans(transactions)
        setOffset(0)
    }
    //-----------------------------------------------

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage customerId={customerId} setCustomer={resetCustomer}
                                                 openAlert={openAlert}/>} />
                <Route path="/trans" element={<TransPage customerId={customerId} setCustomer={resetCustomer}
                                                 transactions={transactions} setTrans={resetTrans}
                                                 offset={offset} setOffset={setOffset}
                                                 openAlert={openAlert}/>} />
            </Routes>

            <AlertDialog open={alertOpen} errMessage={errMessage} closeAlert={closeAlert} />
        </div>
    )
}

export default App
