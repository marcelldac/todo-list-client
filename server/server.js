const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const allTodos = [
  {
    name: 'Marcell',
    status: false
  }
];

//#region Create Todo

app.post('/todos', async (req, res) => {
  const { name } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name,
    },
  });
  return res.status(201).json(todo);
});

//#endregion

//#region Read Todo

app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.status(200).json(todos);
})

//#endregion

//#region Update Todo

app.put('/todos', async (req, res) => {
  const { name, id, status } = req.body;

  if (!id) {
    return res.status(400).json("Id is mandatory");
  }

  const todoAlreadyExists = await prisma.todo.findUnique({ where: { id } });

  if (!todoAlreadyExists) {
    return res.status(404).json("Todo not exists")
  }

  const todo = await prisma.todo.update({
    where: {
      id
    },
    data: {
      name,
      status
    }
  });
  return res.status(200).json(todo)
});

//#endregion

//#region Delete Todo

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({ where: { id: newId } });

  if (!todoAlreadyExist) {
    return res.status(404).json("Todo not found");
  }

  await prisma.todo.delete({ where: { id: newId } });

  return res.status(200).send();
})

//#endregion

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})