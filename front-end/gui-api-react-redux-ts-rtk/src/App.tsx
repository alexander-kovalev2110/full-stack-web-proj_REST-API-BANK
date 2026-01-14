import { Routes,  Route } from 'react-router-dom'
import AuthorPage from "./features/pages/AuthorPage"
import TransPage from './features/pages/TransPage'
import AlertDialog from "./features/components/AlertDialog"

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AuthorPage />} />
                <Route path="/trans" element={<TransPage />} />
            </Routes>

            <AlertDialog />
        </>
    )
}

export default App;
