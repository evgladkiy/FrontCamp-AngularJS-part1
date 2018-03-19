'use strict';

angular.module('app', ['pasvaz.bindonce', 'ui.router', 'ngMessages']);

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
    $stateProvider.state('addTodo', {
        url: '/add-todo',
        templateUrl: './pages/addTodo/templates/addTodo.html',
        controller: 'AddTodoCtrl'
    });
}]);

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

    function generateTodoId(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addTodo(newTodo) {
        var todo = Object.assign(newTodo, {
            creationDate: new Date(),
            _id: String(generateTodoId(0, 10000000))
        });

        if (!todos) {
            getTodos.then(function () {
                return todos.unshift(todo);
            });
        } else {
            todos.unshift(todo);
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
            return todo._id === updatedTodo._id;
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

function AddTodoCtrl($scope, $state, TodosService, InputErrorsService) {
    $scope.newTodo = {
        assignee: '',
        todoText: '',
        duration: ''
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

function EditTodoCtrl($scope, $state, TodosService, InputErrorsService, todo) {
    $scope.todoCopy = Object.assign({}, todo);
    $scope.shouldShowErrors = InputErrorsService.shouldShowErrors;

    $scope.updateTodo = function () {
        if ($scope.updateTodoForm.$valid) {
            TodosService.updateTodo($scope.todoCopy);
            $state.go('home');
        };
    };
};

angular.module('app').controller('EditTodoCtrl', ['$scope', '$state', 'TodosService', 'InputErrorsService', 'todo', EditTodoCtrl]);

angular.module('app').controller('HomeCtrl', ['$scope', 'todos', function ($scope, todos) {
    $scope.filterValue = '';
    $scope.filterCategory = 'todo';
    $scope.doneFilter = 'all';
    $scope.todos = todos;
}]);

function dateToPastDaysFilter() {
    return function (date) {
        var ms = Date.now() - new Date(date);
        var daysAmount = Math.floor(ms / (1000 * 60 * 60 * 24));

        return daysAmount > 0 ? daysAmount : 0.5;
    };
};

angular.module('app').filter('dateToPastDaysFilter', dateToPastDaysFilter);

function todosFilter($filter) {
    return function (todos, doneFilter, filterValue, filterCategory) {
        return todos.filter(function (todo) {
            switch (doneFilter) {
                case 'all':
                    return todo;
                case 'done':
                    return todo.isDone;
                case 'inProgress':
                    return !todo.isDone;
                default:
                    return todo;
            }
        }).filter(function (todo) {
            var mappedValue = filterValue.trim().toLowerCase();
            var filteredProp = void 0;

            if (filterCategory === 'todo') {
                filteredProp = todo.todoText.toLowerCase();
            } else if (filterCategory === 'date') {
                filteredProp = $filter('date')(todo.creationDate, 'dd.MM');
            }

            return filteredProp.indexOf(mappedValue) === 0;
        });
    };
};

angular.module('app').filter('todosFilter', ['$filter', todosFilter]);

angular.module('app').directive('todo', ['TodosService', function (TodosService) {
    return {
        restrict: 'E',
        scope: {
            todo: '='
        },
        templateUrl: './pages/home/directives/todo/todo.html'
    };
}]);

angular.module('app').controller('TodoCtrl', ['$scope', function ($scope) {
    // $sope
}]);

angular.module('app').directive('todoList', [function () {
    return {
        restrict: 'E',
        scope: {
            doneFilter: '@',
            filterValue: '@',
            filterCategory: '@',
            todos: '='
        },
        templateUrl: './pages/home/directives/todoList/todoList.html'
    };
}]);

angular.module('app').directive('todosToolbox', function () {
    return {
        restrict: 'E',
        templateUrl: './pages/home/directives/todosToolbox/todosToolbox.html'
    };
});