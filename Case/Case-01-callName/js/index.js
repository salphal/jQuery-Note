(function (data) {

    // init letiable
    let $Wrapper = $('.wrapper'),
        $Contain = $Wrapper.find('.contain ul'),
        colorsArr = ['#f54545', '#ff8547', '#ffac38'],
        curPage = 0,
        totalPage = Math.ceil(data.length / 10);

    $Contain.hide();

    function bindEvent() {

        $Wrapper.find('.change').on('click', function () {

            curPage = ++curPage % totalPage;

            renderPage(data);
        });
    }

    function renderPage(data) {

        $Contain.hide().find('.item').remove();

        let len = (data.length - curPage * 10) >= 10 ? 10 : data.length - curPage * 10;

        for (let i = 0; i < len; i++) {

            let $Clone = $Wrapper.find('.tpl').clone().removeClass('tpl').addClass('item'),
                ele = data[i + curPage * 10];

            $Clone.children('span').eq(0)
                .text(i + curPage * 10 + 1).css('backgroundColor', curPage == 0 && colorsArr[i + curPage])
                .next()
                .text(ele.title)
                .next()
                .text(ele.search)
                .addClass(ele.search > ele.hisSearch ? 'up' : 'down');

            $Contain.append($Clone);
        }

        $Contain.fadeIn();
    }

    bindEvent();
    renderPage(data);

}(data));