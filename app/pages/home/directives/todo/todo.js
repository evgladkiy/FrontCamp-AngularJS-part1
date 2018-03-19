angular.module('app')
    .directive('todo', ['TodosService', (TodosService) => ({
        restrict: 'E',
        scope: {
            todo: '=',
        },
        templateUrl: './pages/home/directives/todo/todo.html',
    })
]);
