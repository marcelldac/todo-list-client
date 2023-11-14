const express = require("express");
const cors = require("cors");

const taskRouter = require("./router/taskRouter");
const helperRouter = require("./router/helperRouter");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRouter);
app.use("/helper", helperRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
