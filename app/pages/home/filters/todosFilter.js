function todosFilter($filter) {
    return ((todos, doneFilter, filterValue, filterCategory) => {
        return todos.filter((todo) => {
            switch(doneFilter) {
                case 'all':
                    return todo;
                case 'done':
                    return todo.isDone;
                case 'inProgress':
                    return !todo.isDone;
                default:
                    return todo;
            }
        }).filter((todo) => {
            const mappedValue = filterValue.trim().toLowerCase();
            let filteredProp;

            if (filterCategory === 'todo') {
                filteredProp = todo.todoText.toLowerCase();
            } else if (filterCategory === 'date') {
                filteredProp = $filter('date')(todo.creationDate, 'dd.MM');
            }

            return filteredProp.indexOf(mappedValue) === 0;
        })
    });
};

angular.module('app')
    .filter('todosFilter',['$filter', todosFilter]);
