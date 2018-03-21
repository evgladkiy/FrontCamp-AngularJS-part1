angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: './pages/home/templates/home.html',
        });
        $urlRouterProvider.otherwise('/home');
    }]);
