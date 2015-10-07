var module = angular.module("testSite.filters", []);

module.filter("startFrom", function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});