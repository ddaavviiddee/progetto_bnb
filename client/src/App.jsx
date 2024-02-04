import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import UserContextProvider, { UserContext } from './UserContext';
import AccountPage from './pages/AccountPage';
import BnbPage from './pages/BnbPage';
import BnbFormPage from './pages/BnbFormPage';
import HomePage from './pages/HomePage';
import BnbSinglePage from './pages/BnbSinglePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import { useContext } from 'react';
import SearchResultPage from './pages/SearchResultPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}

function AppContent() {
  
  const { user } = useContext(UserContext);

  // L'app content serve a renderizzare l'usercontext prima che venga renderizzata l'app
  // in modo da proteggere le routes

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/search' element={<SearchResultPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/bnb" element={user ? <BnbPage /> : <RegisterPage />}/>
        <Route path="/account/bnb/new" element={user ? <BnbFormPage /> : <RegisterPage />} />
        <Route path="/account/bnb/:id" element={user ? <BnbFormPage /> : <RegisterPage />} />
        <Route path="/account/bookings" element={user ? <BookingsPage /> : <RegisterPage />} />
        <Route path="/account/bookings/:id" element={user ? <BookingPage /> : <RegisterPage />} />
        <Route path="/bnb/:id" element={<BnbSinglePage />} />
      </Route>
    </Routes>
  );
}

export default App;
