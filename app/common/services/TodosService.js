function TodosService($http, $q) {
    let todos = null;
    let isTodoLoaded = false;

    function fetchInitData() {
        return $http.get('./initData/todos.json')
            .then(res => {
                todos = res.data;
                return todos
            });
    }

    function getTodos() {
        if (!todos && !isTodoLoaded) {
            return fetchInitData();
        }
        return $q.resolve(todos);
    }

    function addTodo(newTodo) {
        if (!todos) {
            getTodos.then(() => todos.unshift(newTodo))
        } else {
            todos.unshift(newTodo)
        }
    }

    function removeTodo(todoId) {
        const todoIndex = todos.findIndex(todo => todo._id === todoId);

        todos.splice(todoIndex, 1);
    }

    function updateTodo(updatedTodo) {
        const todoIndex = todos.findIndex(todo => todo._id === updatedTodo);

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
