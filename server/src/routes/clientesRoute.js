const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");
// pets

router.get("/", clientesController.lista);
// um pet ler 1
router.get("/:id", clientesController.show);
// router.get("/user/:id", userController.show);

router.post("/", clientesController.create);
router.put("/:id", clientesController.update);
router.delete("/:id", clientesController.delete);

// router.post("/pet/:user_id", petController.create);

module.exports = router;
