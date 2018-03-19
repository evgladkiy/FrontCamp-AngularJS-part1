function EditTodoCtrl($scope, $state, TodosService, InputErrorsService, todo) {
    $scope.todoCopy = Object.assign({}, todo);
    $scope.shouldShowErrors = InputErrorsService.shouldShowErrors;

    $scope.updateCurrentContact = () => {
        if ($scope.updateContactForm.$valid) {
            TodosService.updateTodo($scope.todoCopy);
            $state.go('home');
        };
    };
};

angular.module('app')
    .controller('EditTodoCtrl',
        ['$scope', '$state', 'TodosService', 'InputErrorsService', 'todo', EditTodoCtrl]);
