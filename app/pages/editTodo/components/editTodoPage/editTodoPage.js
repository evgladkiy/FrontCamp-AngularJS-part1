angular.module('app')
    .component('editTodoPage', {
        bindings: {
            todo: '<',
        },
        templateUrl: 'pages/editTodo/components/addTodoPage/addTodoPage.html',
        controller: function($state, $scope, TodosService) {
            this.shouldShowErrors = (input) => (
                (input.$dirty && input.$touched) || $scope.updateTodoForm.$submitted
            );

            this.updateTodo = () => {
                if ($scope.updateTodoForm.$valid) {
                    TodosService.updateTodo(this.todo);
                    $state.go('home');
                }
            };
        },
    });
