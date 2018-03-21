angular.module('app')
    .directive('customValidator', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attributes, control) {

                control.$validators.customValidator = (modelValue) => (
                    control.$isEmpty(modelValue) || modelValue.length >= Number(attributes.customValidator)
                );
            }
        };
});
