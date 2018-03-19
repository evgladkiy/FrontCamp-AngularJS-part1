angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: './pages/home/templates/home.html',
            controller: 'HomeCtrl',
            resolve: {
                todos: function(TodosService) {
                    return TodosService.getTodos();
                },
            },
        });
        $urlRouterProvider.otherwise('/home');
    }]);
