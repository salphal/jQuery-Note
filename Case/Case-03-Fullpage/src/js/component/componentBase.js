// Render content in section

let ComponentFactory = function (config) {

        let $Div = $('<div class="component base"></div>');

        config.className && $Div.addClass(config.className);
        config.width && $Div.css('width', config.width);
        config.height && $Div.css('height', config.height);
        config.text && $Div.text(config.text);
        config.center && $Div.css({position: 'absolute', left: '50%', marginLeft: config.width / 2});
        config.css && $Div.css(config.css);

        if (config.event) {

            for (let prop in config.event) {

                $Div.on(prop, config.event[prop]);
            }
        }

        $Div.on('cpLeave', function () {

            let self = $(this);

            setTimeout(function () {

                config.animateOut && self.animate(config.animateOut);

            }, config.delay || 0);
        });

        $Div.on('cpLoad', function () {

            let self = $(this);

            setTimeout(function () {

                config.animateIn && self.animate(config.animateIn);

            }, config.delay || 0);
        });

        return $Div;
    },

    ComponentSupperFactory = function () {


    };


