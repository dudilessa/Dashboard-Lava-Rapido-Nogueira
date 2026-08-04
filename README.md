# Lava-Rápido Nogueira · Dashboard

Esqueleto técnico do projeto: React + Vite, sem backend. Login em src/components/Login.jsx,
dashboard placeholder em src/components/Dashboard.jsx. Recharts já instalado para os gráficos.

## 1.1 — Confirmar Node.js instalado

No terminal:

    node -v

Precisa ser Node 18 ou mais recente. Se não tiver, baixe em https://nodejs.org (versão LTS).

## 1.4 — Rodar localmente

Descompacte esta pasta, abra o terminal dentro dela e rode:

    npm install
    npm run dev

Isso abre o projeto em http://localhost:5173 — a tela de login deve aparecer.
A senha de teste está em src/components/Login.jsx (constante SENHA_CORRETA), troque depois.

## 1.5 — Criar o repositório no GitHub

1. Acesse https://github.com/new
2. Nome sugerido: lava-rapido-dashboard
3. Deixe "Public" ou "Private" (tanto faz para o Vercel funcionar)
4. NÃO marque "Add a README" (já temos um) — crie vazio

## 1.6 — Subir o código para o GitHub

Dentro da pasta do projeto:

    git init
    git add .
    git commit -m "Esqueleto inicial do projeto"
    git branch -M main
    git remote add origin https://github.com/SEU-USUARIO/lava-rapido-dashboard.git
    git push -u origin main

(Troque SEU-USUARIO pelo seu usuário do GitHub — o próprio GitHub mostra esse comando
exato na tela depois que você cria o repositório vazio.)

## 1.7 — Conectar ao Vercel

1. Acesse https://vercel.com e entre com sua conta GitHub
2. Clique em "Add New" → "Project"
3. Selecione o repositório lava-rapido-dashboard
4. O Vercel detecta Vite automaticamente — não precisa mudar nada nas configurações
5. Clique em "Deploy"

## 1.8 — Confirmar deploy automático

Depois do primeiro deploy, teste o pipeline: mude qualquer texto num arquivo, rode

    git add .
    git commit -m "teste de deploy"
    git push

e veja se o Vercel atualiza o site sozinho em alguns segundos (acompanhe em vercel.com,
aba do projeto → Deployments).

## Estrutura de pastas

    src/
      components/
        Login.jsx       -> tela de login (client-side, sem backend)
        Dashboard.jsx    -> placeholder do dashboard principal
      App.jsx            -> alterna entre Login e Dashboard
      index.css          -> estilos globais
