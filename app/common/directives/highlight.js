angular.module('app')
    .directive('highlight', () => ({
        restrict: 'A',
        link: function(scope, el, { highlight : word }) {
            if (String(word) !== '') {
                switch (word.toLowerCase()[0]) {
                    case 'a': {
                        el.addClass('highlight_red');
                        break;
                    }
                    case 'b': {
                        el.addClass('highlight_blue')
                        break;
                    }
                    default : return;
                };
            }
        },
    }));
