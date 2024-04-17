import './App.css';
import { createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Homepage from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Joblist from "./components/JobList";
import { useTheme } from './components/ThemeContext';

interface User {
  // Определите тип данных для пользователя, если это необходимо
}

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

function ProtectedRoute() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext && authContext.user !== null;
  console.log("isAuthenticated", isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}

function App() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext && authContext.user !== null;
 
  const { isDark } = useTheme();
  
  return (
    <BrowserRouter>
      <div className={`app ${isDark ? "dark" : "light"}`}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/joblist" element={<ProtectedRoute/>}>
            <Route path="/joblist" element={<Joblist/>}/>
          </Route>
        </Routes>   
      </div>
    </BrowserRouter>
  );
}

export default App;
