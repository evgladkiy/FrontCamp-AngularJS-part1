angular.module('app')
    .controller('TodosToolboxCtrl', ['$scope', 'TodosToolboxService', ($scope, TodosToolboxService) => {
        $scope.filterValue = TodosToolboxService.getFilterValue();
        $scope.categoryFilter = TodosToolboxService.getCategoryFilter();
        $scope.doneFilter = TodosToolboxService.getDoneFilter();
        $scope.updateFilterValue = () => TodosToolboxService.setFilterValue($scope.filterValue);
        $scope.updateCategoryFilter = () => TodosToolboxService.setCategoryFilter($scope.categoryFilter);
        $scope.updateDoneFilter = () => TodosToolboxService.setDoneFilter($scope.doneFilter);
    }]);
