import { Routes,  Route } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import TransPage from './pages/TransPage'
import AlertDialog from "./components/AlertDialog"

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trans" element={<TransPage />} />
            </Routes>

            <AlertDialog />
        </>
    )
}

export default App;
