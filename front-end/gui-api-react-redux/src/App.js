import React from 'react'
import { Routes,  Route } from 'react-router-dom'
import { HomePage } from "./pages/HomePage"
import TransPage from './pages/TransPage'
import AlertDialog from "./components/AlertDialog"

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trans" element={<TransPage />} />
            </Routes>

            <AlertDialog />
        </div>
    )
}

export default App
