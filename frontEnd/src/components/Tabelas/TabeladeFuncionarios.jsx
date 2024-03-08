import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Tabelas/Tabela.css"
import { BsSearch } from "react-icons/bs";

export default function TabeladeFuncionarios() {
  const [data, setData] = useState([]);
//busca
const [busca, setBusca] = useState('');
//corventendo para miniscula
const searchLowerCase=busca.toLowerCase()
console.log(busca)
const nome=data.filter((cliente)=>
cliente.nome.toLowerCase().includes(searchLowerCase)||
cliente.email.toLowerCase().includes(searchLowerCase)

)
//ordenando por nome
const order=nome.sort((a,b)=>a.nome.localeCompare(b.nome))
console.log(order)


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
      <input type="texts"
      value={busca}
      onChange={(e)=>setBusca(e.target.value)}
      className="form"
      placeholder="Pesquise aqui"
      />
   
   <div className="lupa">
    <BsSearch size={30}/>
    </div>
 

<h2 className="h">Lista de Clientes</h2>
</div>
       
       
       
       
        <div className="d-flex justify-content-end">
         
         
         
         
          <Link to="/cadastro" className="btn btn-success">
            Cadastrar
          </Link>
        </div>
        <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              
              <th width={130} 
              onClick={(e)=>handlerOrder('nome')}
              >Nome</th>
              <th width={100}>Email</th>
              <th width={130}>Telefone</th>
              <th width={130}>Ação</th>
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
                  <td className="table-actions">
                    <Link
                      to={`/${clientes.id}`}
                      className="btn btn-sm btn-info"
                    >
                      Ler
                    </Link>

                    <Link
                      to={`/edit/${clientes.id}`}
                      className="btn btn-sm btn-primary mx-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
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


