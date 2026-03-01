import { Routes,  Route } from 'react-router-dom'
import AuthorPage from "./ui-features/pages/AuthorPage"
import TransPage from './ui-features/pages/TransPage'
import AlertDialog from "./ui-features/layouts/ErrorDialog"
import LoadingDialog from "./ui-features/layouts/Loading"

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AuthorPage />} />
                <Route path="/trans" element={<TransPage />} />
            </Routes>

            <AlertDialog />
            <LoadingDialog />
        </>
    )
}

export default App;
