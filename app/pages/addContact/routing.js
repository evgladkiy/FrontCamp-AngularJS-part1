angular.module('app')
    .config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('addContact', {
            url: '/add-contact',
            templateUrl: './pages/addContact/templates/addContact.html',
            controller: 'NewContactCtrl',
        });
    }]);
