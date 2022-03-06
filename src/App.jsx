import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeL, themeD } from "./themes";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import PostView from "./pages/PostView";
import UserView from "./pages/UserView";

const ROLES = {
  User: 101,
  Admin: 102,
  SuperUser: 103,
};

const App = () => {
  const [darkMode, setDarkMode] = React.useState(() => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      return JSON.parse(dark);
    } else {
      return false;
    }
  });

  const darkModeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("dark", !darkMode);
  };

  const themeSwitchConfig = {
    state: darkMode,
    handler: darkModeToggle,
  };

  const appliedTheme = createTheme(darkMode ? themeD : themeL);
  return (
    <ThemeProvider theme={appliedTheme}>
      <Routes>
        <Route
          path="/"
          element={<Layout themeSwitchCofig={themeSwitchConfig} />}
        >
          {/* Public Routes */}
          <Route path="/" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route
              path="/"
              element={<RequireAuth allowedRoles={[ROLES.User]} />}
            >
              <Route path="home" element={<Home />} />
              <Route path="posts/:post_id" element={<PostView />} />
              <Route path="profile" element={<Profile />} />
              <Route path="users/:user_id" element={<UserView />} />
            </Route>
            <Route
              path="/"
              element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
            >
              <Route path="admin" element={<Admin />} />
            </Route>
          </Route>
          {/* Not Found 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
