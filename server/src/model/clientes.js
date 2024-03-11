module.exports = (sequelize, Sequelize) => {
  const Clientes = sequelize.define("clientes", {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: Sequelize.STRING,
      // nao permite valor nulo allowNull:false,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      UNIQUE:true
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false,
      UNIQUE:true
    },
    latitude: {
      type: Sequelize.NUMERIC,
    
     
    },
    longitude : {
      type: Sequelize.NUMERIC,
    
     
    },
  });
  return Clientes;
};
