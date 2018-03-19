angular.module('app')
    .directive('todo', ['TodosService', (TodosService) => ({
        restrict: 'E',
        scope: {
            todo: '=',
        },
        controller: ($scope) => {
            $scope.removeTodo= TodosService.removeTodo;
        },
        templateUrl: './pages/home/directives/todo/todo.html',
    })
]);
