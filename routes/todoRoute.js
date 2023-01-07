const express = require("express");

const todoController = require("../controllers/todoController");

const router = express.Router();

// Get All Todos: GET / todos
router.get("/", todoController.getAllTodos);

// Get Todo By id: GET /todos/:id
// PARAM: id
router.get("/:id", todoController.getTodoBtId);

// Create Todo: POST /todos
// BODY: title(required), completed(default:false), dueDate()
router.post("/", todoController.createTodo);

// Update Todo: PUT /todos/:id
// BODY: title(required), conpleted(default:false), dueDate
router.put("/:id", todoController.updateTodo);

// Delete Todo: DELETE
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
