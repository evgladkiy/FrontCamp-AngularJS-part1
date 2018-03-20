angular.module('app')
    .directive('todoList', [() => ({
            restrict: 'E',
            scope: {
                todos: '=',
            },
            templateUrl: './pages/home/directives/todoList/todoList.html',
        })
    ]);
