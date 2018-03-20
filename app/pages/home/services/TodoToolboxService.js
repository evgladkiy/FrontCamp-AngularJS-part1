function TodosToolboxService() {

    // default inputs value

    let filterValue = '';
    let categoryFilter = 'todo';
    let doneFilter = 'all';

    return {
        getFilterValue() {
            return filterValue.trim().toLowerCase();
        },
        setFilterValue(value) {
            filterValue = value;
        },
        getCategoryFilter() {
            return categoryFilter;
        },
        setCategoryFilter(filter) {
            categoryFilter = filter;
        },
        getDoneFilter() {
            return doneFilter;
        },
        setDoneFilter(filter) {
            doneFilter = filter;
        },
    };
}

angular.module('app')
    .factory('TodosToolboxService', TodosToolboxService);
