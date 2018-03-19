angular.module('app')
    .controller('HomeCtrl', ['$scope', 'todos', ($scope, todos) => {
        $scope.filterValue = '';
        $scope.todos = todos;
    }]);
