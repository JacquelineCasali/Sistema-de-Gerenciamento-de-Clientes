import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Tabelas/Tabela.css";
import { BsSearch } from "react-icons/bs";

export default function TabeladeClientes() {
  const [data, setData] = useState([]);
  //busca
  const [busca, setBusca] = useState("");
  //corventendo para miniscula
  const searchLowerCase = busca.toLowerCase();
  console.log(busca);
  const nome = data.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchLowerCase) 
      // ||
      // cliente.email.toLowerCase().includes(searchLowerCase)
  );
  //ordenando por nome
  const order = nome.sort((a, b) => a.longitude.localeCompare(b.latitude));
  console.log(order);

  useEffect(() => {
    axios
      .get(["http://localhost:5430/"])
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // delete
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5430/" + id)
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="titulo">
        {/* filtro */}
        <input
          type="texts"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="form"
          placeholder="Pesquise aqui"
        />

        <div className="lupa">
          <BsSearch size={30} />
        </div>

        <h2 className="h2">Lista de Clientes</h2>
      </div>

      <div className="d-flex justify-content-end">
       
      <Link to="/ordem" className="btn btn btn-primary mx-2">
          Ordem de Visitação
        </Link>
        <Link to="/cadastro" className="btn btn-success">
          Cadastrar
        </Link>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th width={130} onClick={(e) => handlerOrder("nome")}>
                Nome
              </th>
              <th width={100}>Email</th>
              <th width={100}>Telefone</th>
              <th width={100}>Cordenada X</th>
              <th width={100}>Cordenada y</th>
              <th width={150}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {/* map mostra todos os resultados */}
            {nome.map((clientes, index) => {
              return (
                <tr key={index} cursor="pointer">
                  <td data-title="nome">{clientes.nome}</td>
                  <td data-title="email">{clientes.email}</td>
                  <td data-title="telefone">{clientes.telefone}</td>
                  <td data-title="cordenada">{clientes.latitude}</td>
                  <td data-title="telefone">{clientes.longitude}</td>

                  <td className="table-actions">
                    <Link
                      to={`/${clientes.id}`}
                      className="btn btn-sm btn-info mx-2"
                    >
                      Ler
                    </Link>

                    <Link
                      to={`/edit/${clientes.id}`}
                      className="btn btn-sm btn-primary "
                    >
                      Editar
                    </Link>
                    {/* <Link
                      to={`/rota/${clientes.id}`}
                      className="btn btn-sm btn-warning mx-2"
                    >
                      Rota
                    </Link> */}


                    <button
                      className="btn btn-sm btn-danger mx-2"
                      onClick={() => handleDelete(clientes.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
