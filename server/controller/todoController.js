const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//#region Create Todo

exports.create = async (req, res) => {
  const { name } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name,
    },
  });
  return res.status(201).json(todo);
}

//#endregion

//#region Read Todo

exports.read = async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.status(200).json(todos);
}

//#endregion

//#region Update Todo

exports.update = async (req, res) => {
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
};

//#endregion

//#region Delete Todo

exports.delete = async (req, res) => {
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
};

//#endregion