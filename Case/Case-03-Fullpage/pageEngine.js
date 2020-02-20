let pageEngine = {

    init: function (selector, colorsArray) {

        this.$W = $(selector);
        this.colorsArray = colorsArray;
        this.slideFlag = false;

        return this;
    },

    addSection: function (className) {

        this.$Page = $('<div class="section"></div>').addClass(className);
        this.$Page.appendTo(this.$W);
        this.slideFlag = false;

        return this;
    },

    addSlide: function (className) {

        this.$Slide = $('<div class="slide"></div>').addClass(className);
        this.$Slide.appendTo(this.$Page);
        this.slideFlag = true;

        return this;
    },

    addComponent: function (config) {

        let oCp;

        switch (config.type) {

            case 'base':
                oCp = ComponentFactory(config);
                break;

            case 'super':
                oCp = ComponentSupperFactory(config);
                break;
        }

        this.slideFlag ? this.$Slide.append(oCp) : this.$Page.append(oCp);

        return this;
    },

    bindEvent: function () {

        this.$W.find('.section').on({

            _leave: function () {

                $(this).find('.component').trigger('cpLeave');
            },

            _load: function () {

                $(this).find('.component').trigger('cpLoad');
            }
        });

    },

    load: function () {

        let self = this;
        this.bindEvent();
        this.$W.myFullPage({

            colorsArray: this.colorsArray,

            onLeave: function (index) {

                self.$W.find('.section').eq(index).trigger('_leave');
            },

            onload: function (index) {

                self.$W.find('.section').eq(index).trigger('_load');
            }
        });

        this.$W.find('.section').eq(0).trigger('_load');
    }
};
















