import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login.tsx';
import Dashboard from './Dashboard.jsx';
import Register from './Register.tsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css'

function App() {
  const isAuthenticated = false;

  return (
    <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
    </Router>
  )
}

export default App;
