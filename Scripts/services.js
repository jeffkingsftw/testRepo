var module = angular.module("testSite.services", []);

module.factory("FeedService", function ($http) {

    var getHot = function () {
        return $http.get("http://www.reddit.com/hot.json")
            .then(function (feed) {
                return feed;
            });
    };

    var getTop = function () {
        return $http.get("http://www.reddit.com/top.json")
            .then(function (feed) {
                return feed;
            });
    }

    return {
        getHot: getHot,
        getTop: getTop
    };
});

module.factory("StarService", function ($http) {
    var starFeed = function (url) {
        return $http.get(url);
    };

    return {
        starFeed: starFeed
    };
});
