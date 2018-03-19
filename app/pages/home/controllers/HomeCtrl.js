angular.module('app')
    .controller('HomeCtrl', ['$scope', 'todos', ($scope, todos) => {
        $scope.filterValue = '';
        $scope.filterCategory = 'todo';
        $scope.doneFilter = 'all';
        $scope.todos = todos;
    }]);
