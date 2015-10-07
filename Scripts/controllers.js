var controllers = angular.module("testSite.controllers", []);

function mainController($scope, FeedService, StarService, $window) {
    var ids = $window.ids;
    $scope.hotList = new FeedModel();
    $scope.topList = new FeedModel();

    $scope.currentHotPage = 0;
    $scope.currentTopPage = 0;
    $scope.pageSize = 10;

    var onHotComplete = function (data) {
        $scope.hotList.addData(data);
        markStars($scope.hotList.getData());
    }

    var onTopComplete = function (data) {
        $scope.topList.addData(data);
        markStars($scope.topList.getData());
    }

    var markStars = function ( list ) {
        var i;
        for( i = 0; i < list.length; i++ ) {
            var j;
            for( j = 0; j < ids.length; j++ ) {
                if( list[i].id == ids[j] ) {
                    list[i].isStarred = true;
                }
            }
        }
    }

    var setHotList = function () {
        FeedService.getHot().then(onHotComplete);
    }

    var setTopList = function() {
        FeedService.getTop().then(onTopComplete);
    }

    $scope.getHotLength = function () {
        return $scope.hotList.getFeedLength();
    }

    $scope.getTopLength = function () {
        return $scope.topList.getFeedLength();
    }

    $scope.numberOfPages = function ( length ) {
        return Math.ceil(length / $scope.pageSize);
    }

    $scope.onStarClicked = function (path, id, title, link, numComments, media, username) {
        var uriPath = encodeURIComponent(path);
        var uriUsername = encodeURIComponent(username);
        var uriId = encodeURIComponent(id);
        var url;
        var parameters = "?username=" + uriUsername + "&id=" + uriId;
        var classList = document.getElementById('star' + id).classList;

        if (classList.contains('starred')) {
            url = path + parameters;

            classList.remove("fa-star");
            classList.remove("starred");
            classList.add("fa-star-o");
        } else {
            var uriTitle = encodeURIComponent(title);
            var uriLink = encodeURIComponent(link);
            var uriNumComments = encodeURIComponent(numComments);
            var uriMedia = encodeURIComponent(media);

            parameters += "&link=" + uriLink + "&title=" + uriTitle + "&numComments=" + uriNumComments + "&media=" + uriMedia;
            url = path + parameters;

            classList.remove("fa-star-o");
            classList.add("fa-star");
            classList.add("starred");
        }

        StarService.starFeed(url);
    }

    setHotList();
    setTopList();
}

mainController.$inject = ["$scope", "FeedService", "StarService", "$window"];
controllers.controller("mainController", mainController);
