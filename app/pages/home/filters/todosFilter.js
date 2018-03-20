function todosFilter($filter, TodosToolboxService) {
    return ((todos) => {
        return todos.filter((todo) => {
            const doneFilter = TodosToolboxService.getDoneFilter();

            switch(doneFilter) {
                case 'done': return todo.isDone;
                case 'inProgress': return !todo.isDone;
                default: return todo;
            }
        }).filter((todo) => {
            const filterValue = TodosToolboxService.getFilterValue();
            const categoryFilter = TodosToolboxService.getCategoryFilter();
            let filteredProp;

            if (categoryFilter === 'todo') {
                filteredProp = todo.todoText.toLowerCase();
            } else if (categoryFilter === 'date') {
                filteredProp = $filter('date')(todo.creationDate, 'dd.MM');
            }

            return filteredProp.indexOf(filterValue) === 0;
        })
    });
}

angular.module('app')
    .filter('todosFilter', ['$filter', 'TodosToolboxService', todosFilter]);
