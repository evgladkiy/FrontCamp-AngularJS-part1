function dateToPastDaysFilter() {
    return ((date) => {
        const ms = Date.now() - new Date(date);
        const daysAmount = Math.floor(ms / (1000 * 60 * 60 * 24));

        return daysAmount > 0 ? daysAmount : 0.5;
    });
};

angular.module('app')
    .filter('dateToPastDaysFilter', dateToPastDaysFilter);
