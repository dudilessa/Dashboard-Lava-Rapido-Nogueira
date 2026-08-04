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
      <h1>Lava-Rápido Nogueira</h1>
      <p>Dashboard financeiro</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erro && <p className="erro">Senha incorreta.</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
