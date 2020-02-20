$.fn.extend({

    myFullPage: function (config) {

        let colorsArray = config.colorsArray,
            clientWidth = $(window).outerWidth(),
            clientHeight = $(window).outerHeight(),
            $W = $(this),
            $Section = $W.find('.section'),
            slider = '<div class="sliderWrapper"></div>',
            bodyStyle = {
                position: 'relative',
                overflow: 'hidden',
                margin: 0
            },
            wrapperStyle = {
                position: 'absolute',
                left: 0,
                top: 0
            },
            commonStyle = {
                width: '100%',
                height: '100%'
            },
            slideStyle = {
                position: 'relative',
                float: 'left',
                width: clientWidth,
                height: clientHeight
            },
            curIndex = 0,
            lock = true;

        $('html').add('body')
            .css(bodyStyle)
            .add($W).add($Section)
            .css(commonStyle);

        $W.css(wrapperStyle)
            .find('.section').each(function (index, ele) {

            $(ele).css({
                backgroundColor: colorsArray[index],
                position: 'relative'

            }).find('.slide').css(slideStyle)
                .wrapAll(slider);
        });

        $Section.find('.sliderWrapper')
            .each(function (index, ele) {

                $(ele).css({
                    width: $(ele).find('.slide').size() * clientWidth,
                    height: clientHeight,
                });
            });

        $Section.eq(0).addClass('active')
            .end()
            .find('.sliderWrapper').css(wrapperStyle).each(function (index, ele) {

            $(ele).find('.slide').eq(0).addClass('innerActive');
        });

        $(document).on('keydown', function (e) {

            /**
             * e.which
             *
             * left: 37, top: 38, right: 39, bottom: 40
             */

            let $SW = $('.active').find('.sliderWrapper'),
                curshowDom = $SW.find('.innerActive'),
                newTop = $W.offset().top,
                newLeft,
                direction;

            if (e.which == 38 || e.which == 40) {

                if (lock) {

                    lock = false;
                    direction = '';

                    if (e.which == 38 && curIndex != 0) {

                        // top

                        direction = 'top';
                        config.onleave(curIndex, direction);
                        curIndex--;
                        newTop += clientHeight;

                    } else if (e.which == 40 && curIndex != $Section.size() - 1) {

                        // bottom

                        direction = 'bottom';
                        config.onleave(curIndex, direction);
                        curIndex++;
                        newTop -= clientHeight;
                    }

                    $W.animate({

                        top: newTop

                    }, 350, 'swing', function () {

                        lock = true;

                        $Section.eq(curIndex).addClass('active');

                        if (direction == 'top') {

                            $Section.eq(curIndex + 1).removeClass('active');

                        } else {

                            $Section.eq(curIndex - 1).removeClass('active');
                        }

                        config.afterLoad(curIndex, direction);
                    });
                }
            }

            if ($SW.find('.slide')) {

                if (e.which == 37 || e.which == 39) {

                    if (lock) {

                        lock = false;
                        direction = null;
                        newLeft = $SW.offset().left;

                        if (e.which == 37 && curshowDom.index() != 0) {

                            // left

                            newLeft += clientWidth;
                            direction = 'left';

                        } else if (e.which == 39 && curshowDom.index() != $SW.find('.slide').size() - 1) {

                            // right

                            newLeft -= clientWidth;
                            direction = 'right';
                        }

                        $SW.animate({

                            left: newLeft

                        }, 350, 'swing', function () {

                            lock = true;

                            direction != null ? curshowDom.removeClass('innerActive') : null;

                            if (direction == 'left') {

                                curshowDom.prev().addClass('innerActive');

                            } else {

                                curshowDom.next().addClass('innerActive');
                            }
                        });
                    }
                }
            }
        });
    }
});