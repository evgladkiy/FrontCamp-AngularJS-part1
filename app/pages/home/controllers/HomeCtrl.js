angular.module('app')
    .controller('HomeCtrl', ['$scope', 'todos', ($scope, todos) => {
        $scope.todos = todos;
    }]);
