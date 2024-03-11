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
        
          <h2 className="h2 p-2">Detalhe Cadastro Cliente</h2>
        
          <p className="p-2">Nome: {clientes.nome}</p>
          <p className="p-2">Email: {clientes.email}</p>
          <p className="p-2">Telefone: {clientes.telefone}</p>
          <p className="p-2">Cordenada X:{clientes.latitude }</p>
          <p className="my-3">Cordenada Y:{clientes.longitude }</p>
                 
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
