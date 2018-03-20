function TodosService($http, $q) {
    let todos = null;
    let isTodoLoaded = false;

    function fetchInitData() {
        return $http.get('./initData/todos.json')
            .then(res => {
                todos = res.data;
                return todos;
            });
    }

    function getTodos() {
        if (!todos && !isTodoLoaded) {
            return fetchInitData();
        }
        return $q.resolve(todos);
    }

    function generateTodoId(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addTodo(newTodo) {
        const todo = Object.assign(newTodo, {
            creationDate: new Date(),
            _id: String(generateTodoId(0, 10000000)),
        });

        if (!todos) {
            getTodos.then(() => todos.unshift(todo));
        } else {
            todos.unshift(todo);
        }
    }

    function removeTodo(todoId) {
        const todoIndex = todos.findIndex(todo => todo._id === todoId);

        todos.splice(todoIndex, 1);
    }

    function updateTodo(updatedTodo) {
        const todoIndex = todos.findIndex(todo => todo._id === updatedTodo._id);

        todos.splice(todoIndex, 1, updatedTodo);
    }

    return {
        getTodos,
        addTodo,
        removeTodo,
        updateTodo,
    };
};

angular.module('app')
    .factory('TodosService',['$http', '$q', TodosService]);
