import './App.css';
import Login from './components/LoginPage'
import Homepage from "./components/Homepage";
import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import JobDetails from "./components/JobDetails";


function App() {
  const [isLogin, setLogin] = useState([]);

  return (
    <div className="App">
      <Routes>
      {isLogin ? (
        <Route exact path="/" element={<Homepage setLogin={setLogin} />} />
      ) : (
        <Route exact path="/login" element={ <Login setLogin={setLogin} />} />
      )}
        <Route exact path="/job/:id" element={<JobDetails />} />
      </Routes>
    </div>
  );
}

export default App;
