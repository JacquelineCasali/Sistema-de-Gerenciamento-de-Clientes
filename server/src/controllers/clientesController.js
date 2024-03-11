const { Pool } = require("pg");

// coneção ao banco de dados
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const clientesController = {
  // listando os pets
  lista:
    ("/",
    async (req, res) => {
      try {
        const { rows } = await pool.query("SELECT * FROM clientes");
        return res.status(200).send(rows);
      } catch (err) {
        return res.status(400).send(err);
      }
    }),

  // listar 
  show:
    ("/:id",
    async (req, res) => {
      const { id } = req.params;

      try {
        const { rows } = await pool.query(
          "SELECT * FROM clientes WHERE id=($1)",
          [id]
        );
        return res.status(200).send(rows);
      } catch (err) {
        return res.status(400).send(err);
      }
    }),

  // criando um usuario pet
  create:
    ("/",
    async (req, res) => {
     const {nome,email, telefone, latitude ,longitude  } = req.body;

      try {
        await pool.query(
          "INSERT INTO clientes(nome, email,telefone,latitude ,longitude) VALUES ($1,$2,$3,$4,$5) RETURNING * ",
          [nome, email,  telefone,latitude ,longitude]
        );
        return res.status(200).send({ msg: "Cliente cadastrado com sucesso " });
      } catch (err) {
        return res.status(400).send({ msg: "Cliente já cadastrado, verifique o email ou telefone " });
      }
    }),

  //   // atualizando os pets
  update:
    ("/:id",
    async (req, res) => {
      const { id } = req.params;
      const {nome, email,telefone,latitude ,longitude } = req.body;

      try {
        await pool.query(
          "UPDATE clientes SET nome=($1), email=($2),telefone=($3),latitude=($4),longitude=($5) WHERE id=($6) RETURNING * ",
          [nome, email, telefone,latitude ,longitude, id]
        );
        return res.status(200).send({ msg: "Cliente Atulizado com sucesso " });
      } catch (err) {
        return res.status(400).send({msg: "Cliente já cadastrado, verifique o email ou telefone" });
      }
    }),

  // deletando
  delete:
    ("/:id",
    async (req, res) => {
      const { id } = req.params;

      try {
        await pool.query("DELETE FROM clientes WHERE id=($1)", [id]);
        return res.status(200).send({ msg: "Deletado com sucesso " });
      } catch (err) {
        return res.status(400).send(err);
      }
    }),
};

module.exports = clientesController;
