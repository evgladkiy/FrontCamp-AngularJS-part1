'use strict';

angular.module('app', ['ui.router', 'ngMessages']);

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
    $stateProvider.state('addTodo', {
        url: '/add-todo',
        templateUrl: './pages/addTodo/templates/addTodo.html',
        controller: 'AddTodoCtrl'
    });
}]);

angular.module('app').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('editTodo', {
        url: '/edit-todo/:id',
        templateUrl: './pages/editTodo/templates/editTodo.html',
        controller: 'EditTodoCtrl',
        resolve: {
            todo: function todo($stateParams, TodosService) {
                return TodosService.getTodos().then(function (todos) {
                    return todos.find(function (_ref) {
                        var _id = _ref._id;
                        return _id === $stateParams.id;
                    });
                });
            }
        },
        onEnter: function onEnter($state, todo) {
            if (todo === undefined) {
                $state.go('home');
            }
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
    $scope.todos = todos;
}]);

angular.module('app').filter('capitalize', function () {
    return function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
});

angular.module('app').filter('dateToPastDaysFilter', function () {
    return function (date) {
        var ms = Date.now() - new Date(date);
        var daysAmount = Math.floor(ms / (1000 * 60 * 60 * 24));

        return daysAmount > 0 ? daysAmount : 0.5;
    };
});

function todosFilter($filter, TodosToolboxService) {
    return function (todos) {
        return todos.filter(function (todo) {
            var doneFilter = TodosToolboxService.getDoneFilter();

            switch (doneFilter) {
                case 'done':
                    return todo.isDone;
                case 'inProgress':
                    return !todo.isDone;
                default:
                    return todo;
            }
        }).filter(function (todo) {
            var filterValue = TodosToolboxService.getFilterValue();
            var categoryFilter = TodosToolboxService.getCategoryFilter();
            var filteredProp = void 0;

            if (categoryFilter === 'todo') {
                filteredProp = todo.todoText.toLowerCase();
            } else if (categoryFilter === 'date') {
                filteredProp = $filter('date')(todo.creationDate, 'dd.MM');
            }

            return filteredProp.indexOf(filterValue) === 0;
        });
    };
}

angular.module('app').filter('todosFilter', ['$filter', 'TodosToolboxService', todosFilter]);

function TodosToolboxService() {

    // default inputs value

    var filterValue = '';
    var categoryFilter = 'todo';
    var doneFilter = 'all';

    return {
        getFilterValue: function getFilterValue() {
            return filterValue.trim().toLowerCase();
        },
        setFilterValue: function setFilterValue(value) {
            filterValue = value;
        },
        getCategoryFilter: function getCategoryFilter() {
            return categoryFilter;
        },
        setCategoryFilter: function setCategoryFilter(filter) {
            categoryFilter = filter;
        },
        getDoneFilter: function getDoneFilter() {
            return doneFilter;
        },
        setDoneFilter: function setDoneFilter(filter) {
            doneFilter = filter;
        }
    };
}

angular.module('app').factory('TodosToolboxService', TodosToolboxService);

angular.module('app').directive('todo', [function () {
    return {
        restrict: 'E',
        scope: {
            todo: '='
        },
        templateUrl: './pages/home/directives/todo/todo.html',
        controller: 'TodoCtrl'
    };
}]);

angular.module('app').controller('TodoCtrl', ['$scope', 'TodosService', function ($scope, TodosService) {
    $scope.removeTodo = function (id) {
        return TodosService.removeTodo(id);
    };
}]);

angular.module('app').directive('todoList', [function () {
    return {
        restrict: 'E',
        scope: {
            todos: '='
        },
        templateUrl: './pages/home/directives/todoList/todoList.html'
    };
}]);

angular.module('app').directive('todosToolbox', function () {
    return {
        restrict: 'E',
        templateUrl: './pages/home/directives/todosToolbox/todosToolbox.html',
        controller: 'TodosToolboxCtrl'
    };
});

angular.module('app').controller('TodosToolboxCtrl', ['$scope', 'TodosToolboxService', function ($scope, TodosToolboxService) {
    $scope.filterValue = TodosToolboxService.getFilterValue();
    $scope.categoryFilter = TodosToolboxService.getCategoryFilter();
    $scope.doneFilter = TodosToolboxService.getDoneFilter();
    $scope.updateFilterValue = function () {
        return TodosToolboxService.setFilterValue($scope.filterValue);
    };
    $scope.updateCategoryFilter = function () {
        return TodosToolboxService.setCategoryFilter($scope.categoryFilter);
    };
    $scope.updateDoneFilter = function () {
        return TodosToolboxService.setDoneFilter($scope.doneFilter);
    };
}]);