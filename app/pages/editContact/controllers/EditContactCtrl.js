function EditContactCtrl($scope, $state, ContactsService, InputErrorsService, contact) {
    $scope.contactClone = Object.assign({}, contact);

    $scope.shouldShowErrors = InputErrorsService.shouldShowErrors;

    $scope.updateCurrentContact = () => {
        if ($scope.updateContactForm.$valid) {
            ContactsService.updateContact($scope.contactClone);
            $state.go('home');
        };
    };
};

angular.module('app')
    .controller('EditContactCtrl',
        ['$scope', '$state', 'ContactsService', 'InputErrorsService', 'contact', EditContactCtrl]);
