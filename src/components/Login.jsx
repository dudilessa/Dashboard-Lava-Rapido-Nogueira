import { useState } from 'react';

// Login client-side (sem backend). A senha fica no código/build,
// então isso funciona como barreira simbólica, não segurança real.
const SENHA_CORRETA = 'trocar-depois';

function Login({ onEntrar }) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (senha === SENHA_CORRETA) {
      onEntrar();
    } else {
      setErro(true);
    }
  }

  return (
    <div className="tela-login">
      <img src="/logo.png" alt="Lava-Rápido Nogueira" className="tela-login-logo" />

      <div className="tela-login-card">
        <h1>Dashboard financeiro</h1>
        <p>Acesse as projeções e premissas do negócio.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="senha">
            Senha
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          {erro && <p className="erro">Senha incorreta.</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
