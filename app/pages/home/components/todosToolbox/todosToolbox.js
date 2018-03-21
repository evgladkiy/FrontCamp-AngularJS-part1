angular.module('app')
    .component('todosToolbox', {
        templateUrl: './pages/home/components/todosToolbox/todosToolbox.html',
        controller: function(TodosToolboxService) {
            this.filterValue = TodosToolboxService.getFilterValue();
            this.categoryFilter = TodosToolboxService.getCategoryFilter();
            this.doneFilter = TodosToolboxService.getDoneFilter();
            this.updateFilterValue = () => TodosToolboxService.setFilterValue(this.filterValue);
            this.updateCategoryFilter = () => TodosToolboxService.setCategoryFilter(this.categoryFilter);
            this.updateDoneFilter = () => TodosToolboxService.setDoneFilter(this.doneFilter);
        },
    });
