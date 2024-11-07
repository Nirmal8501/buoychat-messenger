import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import { useAppStore } from "./store/store";

// if user isnt authenticated, we redirect them to auth page
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo; // or Boolean(userInfo)
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

// if user is already authenticated, then redirect them to chat page.
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo; // or Boolean(userInfo)
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
