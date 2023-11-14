const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//#region Create Task

exports.create = async (req, res) => {
  const { name } = req.body;

  const taskAlreadyExists = await prisma.task.findUnique({
    where: {
      name,
    },
  });

  if (!taskAlreadyExists) {
    const task = await prisma.task.create({
      data: {
        name,
      },
    });
    return res.status(201).json(task);
  }

  return res.status(500).json({ error: "Task already exists" });
};

//#endregion

//#region Read Tasks

exports.read = async (req, res) => {
  const tasks = await prisma.task.findMany();

  if (!tasks) {
    return res.status(404).json({ error: "Tasks not found" });
  }

  return res.status(200).json(tasks);
};

//#endregion

//#region Update Todo

exports.update = async (req, res) => {
  const { name, id, status } = req.body;

  if (!id) {
    return res.status(400).json("Id is mandatory");
  }

  const todoAlreadyExists = await prisma.todo.findUnique({ where: { id } });

  if (!todoAlreadyExists) {
    return res.status(404).json("Todo not exists");
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });
  return res.status(200).json(todo);
};

//#endregion

//#region Delete Todo

exports.delete = async (req, res) => {
  const { id } = req.params;
  const newId = parseInt(id);

  if (!newId) {
    return res.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: newId },
  });

  if (!todoAlreadyExist) {
    return res.status(404).json("Todo not found");
  }

  await prisma.todo.delete({ where: { id: newId } });

  return res.status(200).send();
};

//#endregion
