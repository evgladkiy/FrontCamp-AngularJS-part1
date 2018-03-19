angular.module('app')
    .directive('todoList', [() => ({
            restrict: 'E',
            scope: {
                doneFilter: '@',
                filterValue: '@',
                filterCategory: '@',
                todos: '=',
            },
            templateUrl: './pages/home/directives/todoList/todoList.html',
        })
    ]);
