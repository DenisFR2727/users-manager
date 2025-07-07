import Header from '../components/Header/Header';
import { Routes, Route } from 'react-router';
import UsersPage from '../pages/UsersPage';
import About from '../pages/About';
import UserCard from '../features/users/UserCard';

import './App.css';

function App() {
    return (
        <div>
            <Header />
            <main className="app__main">
                <Routes>
                    <Route path="/" element={<UsersPage />} />
                    <Route path="/user-page" element={<UsersPage />} />
                    <Route path="/users/:id/:name" element={<UserCard />} />
                    <Route path="/about-page" element={<About />} />
                </Routes>
            </main>
        </div>
    );
}
export default App;
