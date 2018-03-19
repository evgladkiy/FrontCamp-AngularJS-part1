function TodosService($http, $q) {
    let todos = null;
    let isTodoLoaded = false;

    function fetchInitData() {
        return $http.get('./initData/contacts.json')
            .then(res => todos = res.data);
    }

    function getTodos() {
        if (!todos && !isTodoLoaded) {
            return fetchInitData();
        }
        return $q.defer().resolve(todos);
    }

    function addTodo(newTodo) {
        todos.push(newTodo);
    }

    function removeTodo(todoId) {
        const todoIndex = todos.findIndex(todo => todo._id === todoId);

        todos.splice(todoIndex, 1);
    }

    function updateTodo(updatedContact) {
        const oldContact = contacts.find((contact) => (
            contact._id === updatedContact._id
        ));
        const contactIndex = contacts.indexOf(oldContact);

        contacts.splice(contactIndex, 1, updatedContact);
    }

    fetchInitData();

    return {
        getTodos,
        addTodo,
        removeTodo,
        updateTodo,
    };
};

angular.module('app')
    .factory('TodosService',['$http', TodosService]);
