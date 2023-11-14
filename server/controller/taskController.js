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
  const { id } = req.params;
  const { name, isCompleted } = req.body;

  if (!id) {
    return res.status(400).json("Id is mandatory");
  }

  const intID = parseInt(id);

  const taskAlreadyExists = await prisma.task.findUnique({
    where: { id: intID },
  });

  if (!taskAlreadyExists) {
    return res.status(404).json("Task does not exists");
  }

  const task = await prisma.task.update({
    where: {
      id: intID,
    },
    data: {
      name,
      isCompleted,
    },
  });

  return res.status(200).json(task);
};

//#endregion

//#region Delete Todo

exports.delete = async (req, res) => {
  const { id } = req.params;

  const intID = parseInt(id);

  const taskAlreadyExist = await prisma.task.findUnique({
    where: { id: intID },
  });

  if (!taskAlreadyExist) {
    return res.status(404).json({ error: "Task not found" });
  }

  await prisma.task.delete({ where: { id: intID } });

  return res.status(200).json({ message: `Task with id ${intID} was deleted` });
};

//#endregion
