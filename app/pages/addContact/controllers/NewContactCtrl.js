function NewContactCtrl($scope, $state, ContactsService, InputErrorsService) {
    $scope.newContact = {
        name: '',
        phoneNumber: '',
        email: '',
    };

    $scope.shouldShowErrors = InputErrorsService.shouldShowErrors;

    $scope.addContact = (contact) => {
        if ($scope.newContactForm.$valid) {
            ContactsService.addContact(contact);
            $state.go('home');
        };
    };
};

angular.module('app')
    .controller('NewContactCtrl',
        ['$scope', '$state', 'ContactsService', 'InputErrorsService', NewContactCtrl]);
