import './App.css';
import Login from './components/LoginPage'
import Dashboard from "./components/Dashboard";
import { useState } from 'react';


function App() {
  const [isLogin, setLogin] = useState([]);

  return (
    <div className="App">
      { isLogin ? <Dashboard setLogin={setLogin}/> : <Login setLogin={setLogin} /> }
    </div>
  );
}

export default App;
