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

  // listar um pet
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
      const { nome } = req.body;
      const { email } = req.body;
       const { telefone } = req.body;

      try {
        await pool.query(
          "INSERT INTO clientes(nome, email,telefone) VALUES ($1,$2,$3) RETURNING * ",
          [nome, email,  telefone]
        );
        return res.status(200).send({ msg: "Cliente cadastrado com sucesso " });
      } catch (err) {
        return res.status(400).send({ msg: "Cliente já cadastrado " });
      }
    }),

  //   // atualizando os pets
  update:
    ("/:id",
    async (req, res) => {
      const { id } = req.params;
      const { nome, email, telefone } = req.body;

      try {
        await pool.query(
          "UPDATE clientes SET nome=($1), email=($2),telefone=($3) WHERE id=($4) RETURNING * ",
          [nome, email, telefone, id]
        );
        return res.status(200).send({ msg: "Cliente Atulizado com sucesso " });
      } catch (err) {
        return res.status(400).send({ msg: "Cliente já cadastrado " });
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
