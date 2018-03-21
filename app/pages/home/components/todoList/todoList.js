angular.module('app')
    .component('todoList', {
            templateUrl: './pages/home/components/todoList/todoList.html',
            controller: function(TodosService) {
                this.todos = [];
                TodosService.getTodos().then(todos => this.todos = todos);
            },
        });
