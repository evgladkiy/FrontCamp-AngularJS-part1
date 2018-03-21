angular.module('app')
    .config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('addTodo', {
            url: '/add-todo',
            component: 'addTodoPage',
        });
    }]);

