import React from 'react'
import { BrowserRouter, Routes,  Route } from "react-router-dom"

import HomePage from "./pages/HomePage"
import TransPage from "./pages/TransPage"
import AlertDialog from "./components/AlertDialog"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trans" element={<TransPage />} />
            </Routes>

            <AlertDialog />
        </BrowserRouter>
    )
}

export default App