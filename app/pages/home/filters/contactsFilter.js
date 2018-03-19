function contactsFilter() {
    return ((contacts, filterValue) => {
        const mappedValue = filterValue.trim().toLowerCase();
        return contacts.filter((contact) => {
            const mappedName = contact.name.toLowerCase();
            return mappedName.indexOf(mappedValue) === 0;
        });
    });
};

angular.module('app')
    .filter('contactsFilter', contactsFilter);
