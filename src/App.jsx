
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLogin from './pages/AdminLogin'
import AdminRoute from './components/Auth/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
