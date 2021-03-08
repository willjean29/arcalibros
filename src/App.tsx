import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer limit={1} />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/registro" component={RegisterPage} exact={undefined} />
        <ProtectedRoute
          path="/plataforma"
          component={HomePage}
          exact={undefined}
        />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
