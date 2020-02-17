(function () {

    return $.ajax({

        url: 'https://open.duyiedu.com/jq/movie/power',
        type: 'POST',
        data: {
            username: 'cst',
            password: '123123'
        }
    });

}().then(function (res) {

    // console.log(res);

    if (res.data.power == 'root') {

        return $.ajax({

            url: 'https://open.duyiedu.com/jq/movie/movieList',
            type: 'GET'
        });
    }

}).then(function (res) {

    // console.log(res);

    let df = $.Deferred(),
        data = res.data,
        $Wrapper = $('.wrapper');

    $.each(data, function (index, value) {

        let $MovieSection = $('.tpl').clone().removeClass('tpl').addClass('movieSection');

        $MovieSection
            .data({id: value.id})
            .on('click', function () {

                df.resolve($(this));

            })
            .children().eq(0).attr('src', value.poster)
            .next().text(value.name);

        $Wrapper.append($MovieSection);

    });

    return df.promise();

}).then(function (dom) {

    return $.ajax({
        url: 'https://open.duyiedu.com/jq/movie/movieInfo/201805',
        type: 'GET',
        data: {
            movieId: dom.data('id')
        }
    });

}).then(function (res) {

    console.log(res);

    let data = res.data[0],
        direct = data.direct,
        gut = data.gut,
        mainActor = data.mainActor,
        screenWritter = data.screenwritter,
        htmlStr;

    htmlStr = '<div class="mask">' +
        '<p>导演: ' + direct + '</p>' +
        '<p>剧情: ' + gut + '</p>' +
        '<p>主演: ' + rankNames(mainActor) + '</p>' +
        '<p>主演: ' + rankNames(screenWritter) + '</p>' +
        '</div>';

    console.log(htmlStr);

    function rankNames(target) {

        return target.reduce(function (prev, curv) {

            return prev += curv + ' ';

        }, '')
    }

    $(htmlStr).addClass('des').appendTo('body');

}));