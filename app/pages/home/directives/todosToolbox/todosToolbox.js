angular.module('app')
    .directive('todosToolbox', () => ({
        restrict: 'E',
        templateUrl: './pages/home/directives/todosToolbox/todosToolbox.html',
        controller: 'TodosToolboxCtrl',
    }));
