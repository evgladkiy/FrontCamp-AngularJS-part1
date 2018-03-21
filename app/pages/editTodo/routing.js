angular.module('app')
    .config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('editTodo', {
            url: '/edit-todo/:id',
            component: 'editTodoPage',
            resolve: {
                todo: function($stateParams, TodosService) {
                     return TodosService.getTodos().then((todos) => (
                        todos.find(({ _id }) => _id === $stateParams.id)
                     ))
                },
            },
            onEnter($state, todo) {
                if (todo === undefined) {
                    $state.go('home');
                }
            },
        });
    }]);
