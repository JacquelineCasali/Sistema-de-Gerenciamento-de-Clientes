import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function Ler() {
  const { id } = useParams();
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    //  banco de dados
    axios
      .get("http://localhost:5430/" + id)
      .then((res) => {
        console.log(res);

        setClientes(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
      <div className="m-5">
        
          <h2 className="mb-4">Detalhe Cadastro Cliente</h2>
        
          <p>Nome: {clientes.nome}</p>
          <p>Email: {clientes.email}</p>
          <p>Telefone: {clientes.telefone}</p>
        
        <Link to="/" className="btn btn-primary me-2">
          Voltar
        </Link>

        <Link to={`/edit/${clientes.id}`} className="btn btn-info">
          Editar
        </Link>
      </div>
  );
}
export default Ler;
