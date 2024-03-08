const exprees = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

//  variavel de ambiente
require("dotenv").config();
const PORT = process.env.PORT || 5430;
// consulta no banco de dados
const clientesRoute = require("./src/routes/clientesRoute");
const app = exprees();

app.use(exprees.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", clientesRoute);

// // listando os pets
app.listen(PORT, () => {
  console.log("Estamos rodando em: http://localhost:" + PORT);
});
