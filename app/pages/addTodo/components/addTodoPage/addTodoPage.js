angular.module('app')
    .component('addTodoPage', {
        templateUrl: 'pages/addTodo/components/addTodoPage/addTodoPage.html',
        controller: function($scope, $state, TodosService) {
            this.newTodo = {
                assignee: '',
                todoText: '',
                duration: '',
            };

            this.shouldShowErrors = (input) => (
                (input.$dirty && input.$touched) || $scope.newTodoForm.$submitted
            );

            this.addTodo = (todo) => {
                if ($scope.newTodoForm.$valid) {
                    TodosService.addTodo(todo);
                    $state.go('home');
                };
            };
        },
    });
