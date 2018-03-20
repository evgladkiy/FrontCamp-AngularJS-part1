angular.module('app')
    .directive('todo', [() => ({
        restrict: 'E',
        scope: {
            todo: '=',
        },
        templateUrl: './pages/home/directives/todo/todo.html',
        controller: 'TodoCtrl',
    })
]);
