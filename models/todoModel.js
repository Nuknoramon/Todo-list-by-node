const { v4: uuidv4 } = require("uuid");
const { readTodos, writeTodos } = require("../services/todoService");

module.exports = class Todo {
  constructor(title, completed, dueDate) {
    this.title = title;
    this.completed = completed;
    this.dueDate = dueDate;
  }
  static findAll() {
    return readTodos();
  }

  static async findOne(id) {
    const todos = await readTodos();
    const idx = todos.findIndex((el) => el.id === id);
    if (idx === -1) {
      return null;
    }
    const todo = new Todo(
      todos[idx].title,
      todos[idx].completed,
      todos[idx].dueDate
    );
    todo.id = id;
    return todo;
  }

  static async create(todo) {
    const todos = await readTodos();
    todos.push({ id: uuidv4(), ...todo });
    await writeTodos(todos);
  }

  static async delete(id) {
    const todos = await readTodos();
    await writeTodos(todos.filter((el) => el.id !== id));
  }

  async save() {
    let mode = "update";
    if (!this.id) {
      this.id = uuidv4();
      mode = "create";
    }
    const todos = await readTodos();
    if (mode === "create") {
      todos.push(this);
    } else {
      const idx = todos.findIndex((el) => el.id === this.id);
      todos[idx] = this;
    }

    await writeTodos(todos);
  }
};
