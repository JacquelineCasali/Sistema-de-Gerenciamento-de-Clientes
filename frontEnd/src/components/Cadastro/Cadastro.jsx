import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import "../Cadastro/Cadastro.css"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function Cadastro() {
 
   // formatação de alerta
   const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "green",
  
  };
 


  // criar cadastro
  const [values, setValues] = useState({
    nome: "",
    email: "",
    telefone:"",
  });
  const navigate = useNavigate();
 // validação da senha
 const handleValidation = () => {
  const { nome, email,telefone } = values;
   if (nome === "") {
    //campo nao pode ser vazio
    toast.error("Por favor, preencha seu nome", toastOptions);
    return false;
  } else if (email === "") {
    // campo nao pode ser vazio
    toast.error("Por favor, preencha seu email", toastOptions);
    return false;
  }

  else if (telefone < 9) {
    toast.error("0 Telefone precisa de no mínio de 9 dígitos", toastOptions);
    return false;
  } 
  return true;
};
// const isValidEmail=(){

// }

  const handleSubmit = async(e) => {
   
   
    e.preventDefault();
    if(handleValidation()){
    axios
      .post("http://localhost:5430/", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));

        



      
  }};
  return (
    <section >
             <HelmetProvider>
        <Helmet title="Cadastro" />
      </HelmetProvider>
    
        
    
      <h2 className="h2">Cadastro Clientes</h2>
        <form onSubmit={handleSubmit}>
         

            <label htmlFor="">Nome:</label>

            <input
              className="form-control"
              type="text"
              placeholder="Digite o nome"
              onChange={(e) => setValues({ ...values, nome: e.target.value })}
           
            />
         
        
            <label htmlFor="">Email:</label>

            <input
              className="form-control"
              type="email"
              placeholder="Digite o Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
           
           />
       
        
            <label htmlFor="">Telefone:</label>

            <input
              className="form-control"
              type="tel"
              placeholder="Digite o Telefone"
              onChange={(e) => setValues({ ...values, telefone: e.target.value })}
          
           />
    
          <button className="cadastrar">Cadastrar</button>
        </form>
        <ToastContainer toastStyle={{ backgroundColor: "crimson" }}  /> 
 
    </section>
  );
}
export default Cadastro;
