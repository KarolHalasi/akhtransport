import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "../components/AuthContext";
import Home from "./Home";
import OrderForm from "./OrderForm";
import AdminPanel from "./AdminPanel";

function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <nav className="p-4 bg-blue-800 text-white flex justify-between">
      <div className="space-x-4">
        <Link to="/">Domov</Link>
        <Link to="/order">Objednať</Link>
        {user?.email === "admin@akhtransport.com" && <Link to="/admin">Admin</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-2">{user.displayName}</span>
            <button onClick={logout}>Odhlásiť</button>
          </>
        ) : (
          <button onClick={loginWithGoogle}>Prihlásiť sa cez Google</button>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
