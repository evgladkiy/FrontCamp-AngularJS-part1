function AddTodoCtrl($scope, $state, TodosService, InputErrorsService) {
    $scope.newContact = {
        name: '',
        phoneNumber: '',
        email: '',
    };

    $scope.shouldShowErrors = InputErrorsService.shouldShowErrors;

    $scope.addTodo = (todo) => {
        if ($scope.newTodoForm.$valid) {
            TodosService.addTodo(todo);
            $state.go('home');
        };
    };
};

angular.module('app')
    .controller('AddTodoCtrl',
        ['$scope', '$state', 'TodosService', 'InputErrorsService', AddTodoCtrl]);
