import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "../todos.json");
app.use(bodyParser.json());

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

app.get("/api/todos", (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      console.error("Error reading data file:", err); // 로그 추가

      return res.status(500).send("Error reading data file");
    }
    res.send(JSON.parse(data.toString()));
  });
});

app.post("/api/todos", (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      console.error("Error reading data file:", err); // 로그 추가

      return res.status(500).send("Error reading data file");
    }
    const todos: Todo[] = JSON.parse(data.toString());
    const newTodo: Todo = { id: Date.now(), ...req.body };
    todos.push(newTodo);
    fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), (err) => {
      if (err) {
        console.error("Error writing data file:", err); // 로그 추가

        return res.status(500).send("Error writing data file");
      }
      res.status(201).send(newTodo);
    });
  });
});

app.put("/api/todos/:id", (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      console.error("Error reading data file:", err); // 로그 추가

      return res.status(500).send("Error reading data file");
    }
    let todos: Todo[] = JSON.parse(data.toString());
    const updatedTodo: Todo = req.body;
    todos = todos.map((todo: Todo) =>
      todo.id === parseInt(req.params.id, 10) ? updatedTodo : todo
    );
    fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), (err) => {
      if (err) {
        console.error("Error writing data file:", err); // 로그 추가

        return res.status(500).send("Error writing data file");
      }
      res.send(updatedTodo);
    });
  });
});

app.delete("/api/todos/:id", (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data file");
    }
    let todos: Todo[] = JSON.parse(data.toString());
    todos = todos.filter(
      (todo: Todo) => todo.id !== parseInt(req.params.id, 10)
    );
    fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error writing data file");
      }
      res.status(204).send();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
