import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import NewForm from "./components/New";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((response) => setMessage(response));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact>
              <p>{message && message.message}</p>
            </Route>
            <Route path="/admin/categories/new" component={NewForm} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
