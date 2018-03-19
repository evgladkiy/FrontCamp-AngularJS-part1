angular.module('app')
    .config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('addTodo', {
            url: '/add-todo',
            templateUrl: './pages/addTodo/templates/addTodo.html',
            controller: 'AddTodoCtrl',
        });
    }]);
