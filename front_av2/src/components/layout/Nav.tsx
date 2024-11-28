import { Link } from "react-router-dom";
import "./layout_styles.css";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/pages/tarefa/listar"> Listar Tarefas </Link>
        </li>

        <li>
          <Link to="/pages/tarefa/cadastrar/"> Cadastrar Tarefa </Link>
        </li>
        <li>
          <Link to="/pages/tarefa/naoconcluidas"> Não Concluídas </Link>
        </li>
        <li>
          <Link to="/pages/tarefa/concluidas"> Concluídas </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;