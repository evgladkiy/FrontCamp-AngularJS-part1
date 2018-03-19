angular.module('app')
    .config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('editTodo', {
            url: '/edit-todo/:id',
            templateUrl: './pages/editTodo/templates/editTodo.html',
            controller: 'EditTodoCtrl',
            resolve: {
                todo: ($stateParams, TodosService) => (
                     TodosService.getTodos().then((todos) => (
                        todos.find(({ _id }) => _id === $stateParams.id)
                    ))
                )
            },
            onEnter($state, todo) {
                if (todo === undefined) {
                    $state.go('home');
                };
            },
        });
    }]);
