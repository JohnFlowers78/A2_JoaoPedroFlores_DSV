import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tarefa } from "../../models/Tarefa";
import axios from "axios";

function TarefaNaoConcluidas() {
  
  const [ tarefasNC, setTarefasNC ] = useState<Tarefa[]>([]);

  useEffect(() => {
    axios
      .get<Tarefa[]>("http://localhost:5000/tarefas/naoconcluidas")
      .then((resposta) => {
        setTarefasNC(resposta.data);
      })
      .catch((erro) => {
        console.log("Erro tentando listar Tarefas...", erro);
      });
  });

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Criado Em</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {tarefasNC.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.criadoEm}</td>
              <td>{tarefa.categoria?.nome}</td>
              <td>{tarefa.status}</td>
              <td>
                <Link to={`pages/tarefa/alterar/${tarefa.tarefaId}`}
                >
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaNaoConcluidas;