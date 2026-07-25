import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import { isSessionAuthenticated } from './lib/auth';

export function AppRoutes({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}) {
  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isSessionAuthenticated());

  return (
    <BrowserRouter>
      <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </BrowserRouter>
  );
}

export default App;
