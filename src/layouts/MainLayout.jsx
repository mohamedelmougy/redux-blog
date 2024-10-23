import { Outlet } from 'react-router-dom';
import Header from '../components/Utils/Header'

const MainLayout = () => {
    return (
        <>
            <Header/>
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout