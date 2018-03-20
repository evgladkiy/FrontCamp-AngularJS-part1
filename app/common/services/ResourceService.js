angular.module('app')
    .factory('ResourceService',['$resource', ($resource) => {
    return  $resource('http://localhost:3000/todos', {}, {
        'getTodos': {
            method: 'GET',
            isArray: true,
        }
    });
}]);
