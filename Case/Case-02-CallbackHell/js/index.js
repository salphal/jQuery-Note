$.ajax({
    url: 'https://open.duyiedu.com/jq/movie/power',
    type: 'POST',
    data: {
        username: 'cst',
        password: '123123'
    },
    success: function (res) {

        // console.log(res);

        /**
         * 回掉地狱
         *
         * 设计模式 六大原则
         *
         * 单一指责原则
         */

        if (res.data.power == 'root') {

            $.ajax({
                url: 'https://open.duyiedu.com/jq/movie/movieList',
                type: 'GET',
                success: function (res) {

                    // console.log(res);

                    let data = res.data,
                        $Wrapper = $('.wrapper');

                    $.each(data, function (index, value) {

                        let $MovieSection = $('.tpl').clone().removeClass('tpl').addClass('movieSection');

                        $MovieSection
                            .data({id: value.id}).on('click', function () {

                            $.ajax({
                                url: 'https://open.duyiedu.com/jq/movie/movieInfo/201805',
                                type: 'GET',
                                data: {
                                    movieId: $(this).data('id')
                                },
                                success: function (res) {

                                    let data = res.data[0],
                                        direct = data.direct,
                                        gut = data.gut,
                                        mainActor = data.mainActor,
                                        screenWritter = data.screenwritter,
                                        htmlStr;

                                    htmlStr = '<div class="mask">' +
                                        '<p>导演: '+ direct + '</p>' +
                                        '<p>剧情: '+ gut + '</p>' +
                                        '<p>主演: '+ rankNames(mainActor) + '</p>' +
                                        '<p>主演: '+ rankNames(screenWritter) + '</p>' +
                                        '</div>';

                                    console.log(htmlStr);

                                    function rankNames(target) {

                                        return target.reduce(function (prev, curv) {

                                            return  prev += curv + ' ';

                                        }, '')
                                    }


                                    $(htmlStr).addClass('des').appendTo('body');
                                }
                            });
                        })
                            .children().eq(0).attr('src', value.poster)
                            .next().text(value.name);

                        $Wrapper.append($MovieSection);
                    });
                }
            })
        }
    }
});


