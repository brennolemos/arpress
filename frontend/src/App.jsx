import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import './App.css';

const App = () => {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080")
      .then(res => res.json())
      .then(response => setMessage(response))
  }, [])

  return (
    <div className="App">
      <p>{message && message.message}</p>
    </div>
  );
}

export default App;
