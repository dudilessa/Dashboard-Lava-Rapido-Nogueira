import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [autenticado, setAutenticado] = useState(false);

  return autenticado ? (
    <Dashboard onSair={() => setAutenticado(false)} />
  ) : (
    <Login onEntrar={() => setAutenticado(true)} />
  );
}

export default App;
