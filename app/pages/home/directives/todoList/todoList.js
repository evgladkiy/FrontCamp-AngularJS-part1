angular.module('app')
    .directive('todoList', [() => ({
            restrict: 'E',
            scope: {
                filterValue: '@',
                todos: '=',
            },
            templateUrl: './pages/home/directives/todoList/todoList.html',
        })
    ]);
