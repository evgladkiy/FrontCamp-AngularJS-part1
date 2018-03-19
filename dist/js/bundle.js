'use strict';

angular.module('app', ['pasvaz.bindonce', 'ui.router', 'ngMessages']);

angular.module('app').factory('InputErrorsService', function () {
    return {
        shouldShowErrors: function shouldShowErrors(input, isFormSubmitted) {
            return input.$dirty && input.$touched || isFormSubmitted;
        }
    };
});

function TodosService($http, $q) {
    var todos = null;
    var isTodoLoaded = false;

    function fetchInitData() {
        return $http.get('./initData/todos.json').then(function (res) {
            todos = res.data;
            return todos;
        });
    }

    function getTodos() {
        if (!todos && !isTodoLoaded) {
            return fetchInitData();
        }
        return $q.resolve(todos);
    }

    function addTodo(newTodo) {
        if (!todos) {
            getTodos.then(function () {
                return todos.unshift(newTodo);
            });
        } else {
            todos.unshift(newTodo);
        }
    }

    function removeTodo(todoId) {
        var todoIndex = todos.findIndex(function (todo) {
            return todo._id === todoId;
        });

        todos.splice(todoIndex, 1);
    }

    function updateTodo(updatedTodo) {
        var todoIndex = todos.findIndex(function (todo) {
            return todo._id === updatedTodo;
        });

        todos.splice(todoIndex, 1, updatedTodo);
    }

    return {
        getTodos: getTodos,
        addTodo: addTodo,
        removeTodo: removeTodo,
        updateTodo: updateTodo
    };
};

angular.module('app').factory('TodosService', ['$http', '$q', TodosService]);

angular.module('app').directive('highlight', function () {
    return {
        restrict: 'A',
        link: function link(scope, el, _ref) {
            var word = _ref.highlight;

            if (String(word) !== '') {
                switch (word.toLowerCase()[0]) {
                    case 'a':
                        {
                            el.addClass('highlight_red');
                            break;
                        }
                    case 'b':
                        {
                            el.addClass('highlight_blue');
                            break;
                        }
                    default:
                        return;
                };
            }
        }
    };
});

angular.module('app').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('editTodo', {
        url: '/edit-todo/:id',
        templateUrl: './pages/editTodo/templates/editTodo.html',
        controller: 'EditTodoCtrl',
        resolve: {
            todo: function todo($stateParams, TodosService) {
                return TodosService.getTodos().then(function (todos) {
                    return todos.find(function (_ref2) {
                        var _id = _ref2._id;
                        return _id === $stateParams.id;
                    });
                });
            }
        },
        onEnter: function onEnter($state, todo) {
            if (todo === undefined) {
                $state.go('home');
            };
        }
    });
}]);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: './pages/home/templates/home.html',
        controller: 'HomeCtrl',
        resolve: {
            todos: function todos(TodosService) {
                return TodosService.getTodos();
            }
        }
    });
    $urlRouterProvider.otherwise('/home');
}]);

angular.module('app').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('addTodo', {
        url: '/add-todo',
        templateUrl: './pages/addTodo/templates/addTodo.html',
        controller: 'AddTodoCtrl'
    });
}]);

function EditTodoCtrl($scope, $state, TodosService, InputErrorsService, todo) {
    $scope.todoCopy = Object.assign({}, todo);
    $scope.shouldShowErrors = InputErrorsService.shouldShowErrors;

    $scope.updateCurrentContact = function () {
        if ($scope.updateContactForm.$valid) {
            TodosService.updateTodo($scope.todoCopy);
            $state.go('home');
        };
    };
};

angular.module('app').controller('EditTodoCtrl', ['$scope', '$state', 'TodosService', 'InputErrorsService', 'todo', EditTodoCtrl]);

angular.module('app').controller('HomeCtrl', ['$scope', 'todos', function ($scope, todos) {
    $scope.filterValue = '';
    $scope.todos = todos;
}]);

function contactsFilter() {
    return function (contacts, filterValue) {
        var mappedValue = filterValue.trim().toLowerCase();
        return contacts.filter(function (contact) {
            var mappedName = contact.name.toLowerCase();
            return mappedName.indexOf(mappedValue) === 0;
        });
    };
};

angular.module('app').filter('contactsFilter', contactsFilter);

function AddTodoCtrl($scope, $state, TodosService, InputErrorsService) {
    $scope.newContact = {
        name: '',
        phoneNumber: '',
        email: ''
    };

    $scope.shouldShowErrors = InputErrorsService.shouldShowErrors;

    $scope.addTodo = function (todo) {
        if ($scope.newTodoForm.$valid) {
            TodosService.addTodo(todo);
            $state.go('home');
        };
    };
};

angular.module('app').controller('AddTodoCtrl', ['$scope', '$state', 'TodosService', 'InputErrorsService', AddTodoCtrl]);

angular.module('app').directive('todo', ['TodosService', function (TodosService) {
    return {
        restrict: 'E',
        scope: {
            todo: '='
        },
        controller: function controller($scope) {
            $scope.removeTodo = TodosService.removeTodo;
        },
        templateUrl: './pages/home/directives/todo/todo.html'
    };
}]);

angular.module('app').directive('todoList', [function () {
    return {
        restrict: 'E',
        scope: {
            filterValue: '@',
            todos: '='
        },
        templateUrl: './pages/home/directives/todoList/todoList.html'
    };
}]);

angular.module('app').directive('todosTollbox', function () {
    return {
        restrict: 'E',
        templateUrl: './pages/home/directives/todosTollbox/todosTollbox.html'
    };
});