import { useEffect, useState } from "react";
import { Categoria } from "../../models/Categoria";
import axios from "axios";
import { Tarefa } from "../../models/Tarefa";

function TarefaCadastro() {
  
  const [ categorias, setCategorias ] = useState<Categoria[]>([]);
  const [ titulo, setTitulo ] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ status, setStatus ] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      })
      .catch((erro) => {
        console.log("Erro Tentando Listar Categorias...", erro);
      });
  });

  function EnviarTarefa(e: any) {
    e.preventDefault();

    const tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      categoriaId: categoriaId,
    }

    axios
      .post("http://localhost:5000/api/tarefas/cadastrar", tarefa)
      .then((resposta) => {
        console.log("A Tarefa Foi Cadastrado!", resposta.data);
      })
      .catch((erro) => {
        console.log("Erro ao Cadastrar Tarefa!", erro);
      });
  }

  return (
    <div id="cadastrar_tarefa" className="container">
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={EnviarTarefa}  /*className={styles.form}*/>
        <div>
          <label htmlFor="titulo">Título</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            required 
            onChange={(e: any) => setTitulo(e.target.value)} />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <input 
            type="text" 
            id="descricao" 
            name="descricao" 
            onChange={(e: any) => setDescricao} />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input 
            type="text" 
            id="status" 
            name="status" 
            onChange={(e: any) => setStatus} />
        </div>
        <div>
          <label htmlFor="categoria">Selecione uma Categoria:</label>
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
        <button type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
}

export default TarefaCadastro;