const express = require('express');
const bodyParser = require('body-parser')
const { get, store, getById, update, destroy } = require('./tasks');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.url, req.params);
    next();
});

app.get('/tasks', (req, res) => {
    const { page, limit } = req.query;

    const tasks = get(page, limit);

    res.json({ tasks: tasks });
});

app.post('/tasks', (req, res) => {
    const { task } = req.body;

    if (
        task.title == null ||
        task.description == null ||
        task.completed == null
    ) {
        res.status(422).end();
    }

    const tasks = store(task);

    res.json({ tasks });
});

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(422).end();
    }

    const task = getById(id);

    if (!task) {
        res.status(404).end();
    }

    res.json({ task });
});

app.put('/tasks/:id', (req, res) => {
    const { task } = req.body;
    const { id } = req.params;

    if (
        task.id == null ||
        task.title == null ||
        task.description == null ||
        task.completed == null
    ) {
        res.status(422).end();
    }

    const tasks = update(id, task);

    if (!tasks) {
        res.status(404).end();
    }

    res.json({ tasks });
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(422).end();
    }

    const task = destroy(id);

    if (!task) {
        res.status(404).end();
    }

    res.json({ task });
});

app.listen(3000);
