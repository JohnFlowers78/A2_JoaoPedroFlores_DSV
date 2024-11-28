import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Categoria } from "../../models/Categoria";
import axios from "axios";
import { Tarefa } from "../../models/Tarefa";

function TarefaAlterar() {
  const { tarefaId } = useParams();
  const [ categorias, setCategorias ] = useState<Categoria[]>([]);
  const [ titulo, setTitulo ] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ status, setStatus ] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    if(tarefaId) {
      axios
        .get<Tarefa>(`http://localhost:5000/api/tarefas/buscar/${tarefaId}`)
        .then((resposta) => {
          setTitulo(resposta.data.titulo);
          setDescricao(resposta.data.descricao);
          setStatus(resposta.data.status);
          PesquisarCategorias();
        })
        .catch((erro) => {
          console.log("Erro ao Buscar Tarefa...", erro);
        });
    }
  }, []);

  function PesquisarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      })
      .catch((erro) => {
        console.log("Erro Listando Categorias...", erro);
      });
  }

  function enviarTarefa(e: any) {
    e.preventDefault();

    const tarefaAlterada: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      categoriaId: categoriaId,
    }

    axios
      .put(`http://localhost:5000/api/tarefas/alterar/${tarefaId}`, tarefaAlterada)
      .then((resposta) => {
        console.log("A Tarefa Foi Alterada!", resposta.data);
      })
      .catch((erro) => {
        console.log("Erro ao Alterar Tarefa...", erro);
      });
  }

  return (
    <div id="alterar-tarefa" className="container">
      <h1>Alterar Tarefa</h1>
      <form onSubmit={enviarTarefa}>
      <div>
          <label htmlFor="titulo">Título</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo"
            value={titulo} 
            required 
            onChange={(e: any) => setTitulo(e.target.value)} />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <input 
            type="text" 
            id="descricao" 
            name="descricao"
            value={descricao} 
            onChange={(e: any) => setDescricao(e.target.value)} />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input 
            type="text" 
            id="status" 
            name="status"
            value={status} 
            onChange={(e: any) => setStatus(e.target.value)} />
        </div>
        <div>
          <label htmlFor="categoria">Categoria:</label>
          <select             
            id="categoria" 
            name="categoria" 
            onChange={(e: any) => setCategoriaId(e.target.value)}
          >
            {categorias.map((categoria) => (
              <option 
                value={categoria.categoriaId}
                key={categoria.categoriaId}
              >
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Alterar Tarefa</button>
      </form>
    </div>
  )
}

export default TarefaAlterar;