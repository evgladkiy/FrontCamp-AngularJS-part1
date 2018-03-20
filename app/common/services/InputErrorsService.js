angular.module('app')
    .factory('InputErrorsService', () => ({
        shouldShowErrors(input, isFormSubmitted) {
            console.log(input)
            return (input.$dirty && input.$touched) || isFormSubmitted;
        },
    }));
