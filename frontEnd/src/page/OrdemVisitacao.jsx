import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import TabeladeVisitacao from '../components/Tabelas/TabeladeVisitacao';

export default function OrdemVisitacao() {
  return (
  

   <>
     <HelmetProvider>
        <Helmet title="Ordem de Visitação Clientes" />
      </HelmetProvider>


 <TabeladeVisitacao/>
   </>
   
    

  )
}
