// import logo from "./logo.svg";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout.js";
import "./App.css";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";
import AuthContext from "./store/auth-context.js";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {authCtx.isLoggedIn && (
          <Route path="/profile" element={<UserProfile />} />
        )}

        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Layout>
  );
}

export default App;
