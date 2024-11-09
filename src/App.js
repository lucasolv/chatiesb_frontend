import './App.css';

// router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components


//contexts
import { UserProvider } from './context/UserContext';

// pages
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Chat from './pages/Chat/Chat';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
        <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
