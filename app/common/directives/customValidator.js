angular.module('app')
    .directive('customValidator', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attributes, control) {

                control.$validators.customValidator = function (modelValue) {
                    return control.$isEmpty(modelValue) || modelValue.length >= 20;
                };
            }
        };
});
