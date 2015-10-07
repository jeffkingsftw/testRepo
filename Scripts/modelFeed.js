function FeedModel() {
    var feeds = new Array();

    var addData = function (feed) {
        var data = feed.data.data.children;
        var i;
        for (i = 0; i < data.length; i++) {
            var o = data[i].data;
            var id = o.id;
            var link = o.url;
            var title = o.title;
            var numComments = o.num_comments;
            var media = o.thumbnail;

            var feed = {
                "isStarred": false,
                "id": id,
                "link": link,
                "title": title,
                "numComments": numComments,
                "media": media
            };

            feeds.push(feed);
        }
    }

    var getData = function () {
        return feeds;
    }

    var getFeedLength = function () {
        return feeds.length;
    }

    return {
        addData: addData,
        getData: getData,
        getFeedLength: getFeedLength
    }
}