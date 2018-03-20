angular.module('app')
    .controller('TodoCtrl', ['$scope', 'TodosService', ($scope, TodosService) => {
        $scope.removeTodo = (id) => TodosService.removeTodo(id);
    }]);
