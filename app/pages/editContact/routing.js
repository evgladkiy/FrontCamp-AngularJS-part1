angular.module('app')
    .config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('editContact', {
            url: '/edit-contact/:id',
            templateUrl: './pages/editContact/templates/editContact.html',
            controller: 'EditContactCtrl',
            resolve: {
                contact($state, $stateParams, ContactsService) {
                    const contacts = ContactsService.getAll();

                    return contacts.find(({ _id }) => (
                        _id === Number($stateParams.id)
                    ));
                },
            },
            onEnter($state, contact) {
                if (contact === undefined) {
                    $state.go('home');
                };
            },
        });
    }]);
