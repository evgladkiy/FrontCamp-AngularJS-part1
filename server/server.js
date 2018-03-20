const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

let todos = '';

fs.readFile(path.join(__dirname, 'initData/todos.json'), 'utf8', (err, data) => {
    if (err) throw err;
    todos = data;
    app.listen(3000, () => console.log('server started'));
});


app.get('/todos', (req, res) => res.send(todos));
