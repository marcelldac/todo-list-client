const express = require('express');
const cors = require('cors');

const todosRouter = require('./router/todos');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/todos', todosRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})