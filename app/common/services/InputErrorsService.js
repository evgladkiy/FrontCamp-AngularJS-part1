angular.module('app')
    .factory('InputErrorsService', () => ({
        shouldShowErrors(input, isFormSubmitted) {
            return (input.$dirty && input.$touched) || isFormSubmitted;
        },
    }));
