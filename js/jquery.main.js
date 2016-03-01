(function () {

    $(function () {

        $('.btn_1').on({
            'click': function () {
                $('.call-manager__feedback').addClass('open');
                return false
            }
        });

        $('.call-manager__close').on({
            'click': function () {
                $('.call-manager__feedback').removeClass('open');
                return false
            }
        });

        $.each($('.call-manager__feedback'), function () {
            new FormValidation($(this));
        });

        $.each( $( '.our-team__slider' ), function() {
            new SingleSlider ( $( this ) );
        } );

        $.each( $( '.portfolio__slider' ), function() {
            new SliderPortfolio ( $( this ) );
        } );

        $.each( $( '.main-slider' ), function() {
            new SingleSlider ( $( this ) );
        } );

        $('.questions').each(function () {
            new Questions($(this));
        });

        $('.your-choice__slider').each(function () {
            SliderChoice($(this));
        });

        $( ' .way__content ' ).each( function() {
            new WayAnimate ( $( this ) );
        } )

    });

    var SingleSlider = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _sliderWrapper = _obj.find( '.swiper-container' ),
            _slider;


        //private methods
        var _initSlider = function () {

                if ( _obj.hasClass( 'main-slider' ) ) {

                    _slider = new Swiper ( _sliderWrapper, {
                        autoplay: 4000,
                        speed: 500,
                        effect : 'fade'
                    } );

                } else {

                    _slider = new Swiper ( _sliderWrapper, {
                        autoplay: 4000,
                        speed: 500
                    } );

                }

            },
            _init = function () {
                _obj[ 0 ].obj = _self;
                _initSlider();

            };

        //public properties

        //public methods

        _init();
    };

    var WayAnimate = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _start = _obj.offset().top,
            _scrolling = $(window).scrollTop(),
            navigation;

        //private methods
        var _navigation = function () {

                if (_scrolling > _start) {

                    $('.way__decision-item').addClass('visible');

                }
            },
            _init = function () {
                _obj[ 0 ].obj = _self;
                _initSlider();
            };

            $(window).scroll(function () {
                navigation();
            })

        //public properties

        //public methods

        _init();
    };

    var Questions = function (obj) {


        //private methods

        var _obj = obj,
            _addEvents = function () {
                _obj.on('click', '.questions__elem', function () {

                    var _cur_data_que = $(this).parent().attr('data-que'),
                        _curValue = $(this).find('.questions__radio').val(),
                        _curBlock = $('.questions__item');

                    _curBlock.each(function () {

                        var _each_data_que = $(this).attr('data-que');

                        if (_each_data_que > _cur_data_que) {
                            $(this).remove();
                        }

                    });

                    $.ajax({
                        url: "php/ajax.php?button=" + _curValue,
                        data: "button" + _curValue,
                        dataType: 'html',
                        type: "GET",
                        success: function (data) {
                            _obj.append(data);
                            _curBlock.removeClass('questions__item-wait');
                            return false;
                        },
                        error: function (XMLHttpRequest) {
                            if (XMLHttpRequest.statusText != "abort") {
                                _curBlock.removeClass('questions__item-wait');
                                console.log("ERROR!!!");
                            }
                        }
                        ,
                        beforeSend: function(XMLHttpRequest){
                            _curBlock.addClass('questions__item-wait');

                        }
                    });


                })
            }

        _init = function () {
            _addEvents();
        };


        //public properties

        //public methods


        _init();
    };

    var SliderPortfolio = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _sliderWrapper = _obj.find('.swiper-container'),
            _nextBtn = _obj.find('.swiper-button-next'),
            _prevBtn = _obj.find('.swiper-button-prev'),
            _slider;


        //private methods
        var _initSlider = function () {

                _slider = new Swiper(_sliderWrapper, {
                    slidesPerView: 3,
                    nextButton: _nextBtn,
                    prevButton: _prevBtn,
                    spaceBetween: 30,
                    speed: 500
                });

            },
            _init = function () {
                _obj[ 0 ].obj = _self;
                _initSlider();

            };

        //public properties

        //public methods

        _init();
    };

    var FormValidation = function (obj) {
        var _obj = obj,
            _inputs = _obj.find($("[required]")),
            _select = _obj.find($("select[required]"));

        var _addEvents = function () {

                _obj.on({
                    'submit': function () {

                        $.each(_inputs, function () {

                            var curItem = $(this),
                                curAttr = curItem.attr("type");

                            if (curAttr == "checkbox") {
                                var curCheck = this.checked;
                                if (!curCheck) {
                                    curItem.addClass("site__required-error");
                                    curItem.closest("fieldset").addClass('error');
                                }

                            }
                            else if (curItem.is("select")) {

                                if (!curItem.parents(".site__connection-hide_true").length) {
                                    if (curItem.val() == "0") {
                                        curItem.closest("fieldset").addClass('error');
                                    }
                                }

                            }
                            else if (curItem.val() == '') {

                                if (!curItem.parents(".site__connection-hide_true").length) {
                                    curItem.addClass("site__required-error");
                                    curItem.closest("fieldset").addClass('error');
                                }
                            }
                            else if (curAttr == "email") {
                                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                                if (pattern.test(curItem.val()) == false) {
                                    curItem.addClass("site__required-error");
                                    curItem.closest("fieldset").addClass('error');
                                }
                            }

                        });

                        if (!(_obj.find('.error').length)) {

                            if (_obj.hasClass('call-manager__feedback')) {

                                $.ajax({
                                    url: 'php/form.php',
                                    dataType: 'html',
                                    timeout: 20000,
                                    type: "GET",
                                    data: {
                                        send: 'true',
                                        name: $('#name').val(),
                                        phone: $('#phone').val(),
                                        time: $('#time').val()
                                    },
                                    success: function () {
                                        $('.call-manager__feedback').removeClass('open');
                                        $('.call-manager__successfully').addClass('success');
                                    },
                                    error: function (XMLHttpRequest) {
                                        if (XMLHttpRequest.statusText != "abort") {
                                            alert(XMLHttpRequest.statusText);
                                        }
                                    }
                                });
                                return false;
                            }

                        } else {

                            return false;

                        }
                    }
                });
                _inputs.on({

                    'focus': function () {

                        var curItem = $(this),
                            closest = curItem.closest("fieldset"),
                            innerInputs = closest.find("input");

                        if (closest.hasClass('error')) {
                            curItem.removeClass("site__required-error");
                            if (innerInputs.length > 1) {
                                if (!closest.find(".site__required-error").length) {
                                    closest.removeClass('error');
                                }
                            } else {
                                closest.removeClass('error');
                            }
                        }

                    }

                });

                _select.on({
                    change: function () {
                        var curItem = $(this);
                        curItem.closest("fieldset").removeClass('error');
                    }
                });
            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

    var SliderChoice = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _sliderWrapper = _obj.find('.swiper-container'),
            _nextBtn = _obj.find('.swiper-button-next'),
            _prevBtn = _obj.find('.swiper-button-prev'),
            _slider;


        //private methods
        var _initSlider = function () {

                _slider = new Swiper(_sliderWrapper, {
                    slidesPerView: 1,
                    nextButton: _nextBtn,
                    prevButton: _prevBtn,
                    loop:true,
                    spaceBetween: 30
                });

            },
            _init = function () {
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };


})();