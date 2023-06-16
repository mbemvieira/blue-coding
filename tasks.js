let tasks = [
    {
        id: 1,
        title: 'task 1',
        description: 'description',
        completed: 1,
    },
    {
        id: 2,
        title: 'task 2',
        description: 'description',
        completed: 1,
    },
];

const get = (page, limit) => {
    if (
        page == null ||
        Number.isNaN(page) ||
        page <= 0
    ) {
        page = 1;
    }

    if (
        limit == null ||
        Number.isNaN(limit) ||
        limit <= 0 ||
        limit > 100
    ) {
        limit = 10;
    }

    const start = limit * (page - 1);
    const end = limit * (page);

    return tasks.slice(start, end);
}

const store = (task) => {
    const id = tasks[tasks.length - 1].id;

    task.id = id + 1;

    tasks.push(task);

    return task;
}

const getById = (id) => {
    return tasks.find((el) => el.id == id);
}

const update = (id, task) => {
    const taskModel = getById(id);

    if (!taskModel) {
        return null;
    }

    tasks = tasks.map((el) => {
        if (el.id == id) {
            return { ... task };
        }

        return { ...el };
    });

    return task;
}

const destroy = (id) => {
    const task = getById(id);

    if (!task) {
        return null;
    }

    tasks = tasks.filter((el) => el.id != id);

    return task;
};

module.exports = {
    get,
    store,
    getById,
    update,
    destroy,
};
