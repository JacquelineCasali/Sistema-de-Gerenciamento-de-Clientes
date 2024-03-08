import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import TabeladeFuncionarios from '../components/Tabelas/TabeladeFuncionarios';

export default function Home() {
  return (
  

   <>
     <HelmetProvider>
        <Helmet title="Sistema de Gerenciamaneto de Clientes" />
      </HelmetProvider>


   <TabeladeFuncionarios/>
   </>
   
    

  )
}
