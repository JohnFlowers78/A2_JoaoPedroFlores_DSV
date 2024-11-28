import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import TarefaCadastro from './components/tarefa/TarefaCadastro';
import TarefaLista from './components/tarefa/TarefaLista';
import TarefaAlterar from './components/tarefa/TarefaAlterar';
import TarefaNaoConcluidas from './components/tarefa/TarefaNaoConcluidas';
import TarefaConcluidas from './components/tarefa/TarefaConcluidas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Nav />

        <Routes>

        <Route 
            path="/"
            element={<TarefaLista />} />

          <Route 
            path="/pages/tarefa/cadastrar"
            element={<TarefaCadastro />} />

          <Route 
            path="/pages/tarefa/listar"
            element={<TarefaLista />} />

          <Route 
            path="/pages/tarefa/alterar/:tarefaId" 
            element={<TarefaAlterar />} />

          <Route 
            path="/pages/tarefa/naoconcluidas" 
            element={<TarefaNaoConcluidas />} />

          <Route 
            path="/pages/tarefa/concluidas" 
            element={<TarefaConcluidas />} />

        </Routes>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
