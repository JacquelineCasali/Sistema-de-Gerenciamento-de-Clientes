import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import "../Editar/Editar.css"
import BotaoVoltar from "../Voltar/BotaoVoltar";


export default function Editar() {
  const { id } = useParams();
  useEffect(() => {
    // puxando dados do banco
    //  banco de dados
    axios
      .get("http://localhost:5430/" + id)
      .then((res) => {
        console.log(res);

        setValues(res.data[0]);
      })


      
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    nome: "",
    email: "",
    telefone:"",
    latitude :"",
    longitude:"",
    
  });
  //  editar
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5430/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
     // .catch((err) => console.log(err));
     .catch((error) =>
     {
    const { data } = error.response;
   
    alert(data.msg);
      console.log(data.msg)});
  
    };

  return (
    <section >
             <HelmetProvider>
        <Helmet title="Editar Cadastro" />
      </HelmetProvider>
    
      <BotaoVoltar/>
      <h2 className="h2">Editar Clientes</h2>
          
      
        <form onSubmit={handleUpdate}>
         

            <label htmlFor="">Nome:</label>

            <input
              className="form-control"
              type="text"
              placeholder="Digite o nome"
              value={values.nome}
              onChange={(e) => setValues({ ...values, nome: e.target.value })}
           
            />
         
        
            <label htmlFor="">Email:</label>

            <input
              className="form-control"
              type="email"
              placeholder="Digite o Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
           
           />
       
        
            <label htmlFor="">Telefone:</label>

            <input
              className="form-control"
              type="text"
              placeholder="Digite o Telefone"
              value={values.telefone}
              onChange={(e) => setValues({ ...values, telefone: e.target.value })}
          
           />
 <label htmlFor="">Coordenada X :</label>
<input
  className="form-control"
  type="text"
  placeholder="Digite cordenada X"
  value={values.latitude}
  onChange={(e) => setValues({ ...values, latitude : e.target.value })}

/>
    <label htmlFor="">Coordenada Y :</label>

<input
  className="form-control"
  type="text"
  placeholder="Digite cordenada y"
  value={values.longitude}
  onChange={(e) => setValues({ ...values, longitude : e.target.value })}

/>
          <button className="cadastrar">Editar</button>
        </form>
       
    </section>
  );
}

