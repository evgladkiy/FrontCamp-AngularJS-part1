angular.module('app')
    .component('todo', {
        bindings: {
            todo: '<',
        },
        templateUrl: './pages/home/components/todo/todo.html',
        controller: function(TodosService) {
            this.removeTodo = (id) => TodosService.removeTodo(id);
        },
    });
