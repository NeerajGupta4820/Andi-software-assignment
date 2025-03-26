import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Signup from './components/auth/Register';
import Login from './components/auth/Login';
import Contact from './Pages/Contact';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import About from './Pages/About';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RoleBasedDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (user.role === 'admin') {
    return <AdminDashboard />;
  }
  return <UserDashboard />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Dashboard Route - Handles both user and admin */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <RoleBasedDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;