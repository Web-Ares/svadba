( function() {

    $( function() {

        $('.btn_1').on({
            'click':function(){
                $('.call-manager__feedback').addClass('open');
                return false
            }
        });
        $('.call-manager__close').on({
            'click':function(){
                $('.call-manager__feedback').removeClass('open');
                return false
            }
        });

        $.each( $('.call-manager__feedback'), function(){
            new FormValidation ( $(this) );
        } );

        /*$("#form").submit(function() {
            var form_data = $(this).serialize();
            $.ajax({
                type: "POST",
                url: "php/form.php",
                timeout: 20000,
                dataType: 'html',
                data: form_data,
                success: function(html) {
                    $('.call-manager__form').addClass('success');
                    $('.call-manager__successfully').addClass('success').fadeOut(10000);
                },
                error: function (XMLHttpRequest) {
                    if (XMLHttpRequest.statusText != "abort") {
                        alert(XMLHttpRequest.statusText);
                    }
                }
            });
        });*/

        $('.swiper-container').each(function () {
            Slider($(this));
        });

        $( '.our-team__slider' ).each(function () {

            SliderTeam( $( this ) );

        });

        $( '.portfolio__slider' ).each(function () {

            SliderPortfolio( $( this ) );

        });
        $( '.your-choice__slider' ).each(function () {

            SliderChoice( $( this ) );

        });

    } );

var Slider = function (obj) {

    //private properties
    var _self = this,
        _next = obj.find($('.swiper-button-next')),
        _prev = obj.find($('.swiper-button-prev')),
        _paginator = obj.find($('.swiper-pagination')),
        _obj = obj;

    //private methods
    var _addEvents = function () {

        },
        _init = function () {
            _addEvents();
        };
    if (_obj.hasClass('gallery__slider')) {
        var _swiper = new Swiper(_obj, {
            slidesPerView: 1,
            loop: true,
            effect: 'fade'
        });
    }

    //public properties

    //public methods

    _init();
};

    var SliderPortfolio = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _sliderWrapper = _obj.find( '.swiper-container' ),
            _nextBtn = _obj.find( '.swiper-button-next' ),
            _prevBtn = _obj.find( '.swiper-button-prev' ),
            _slider;


        //private methods
        var _initSlider = function () {

                _slider = new Swiper( _sliderWrapper, {
                    slidesPerView: 3,
                    nextButton: _nextBtn,
                    prevButton: _prevBtn,
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

    var FormValidation = function (obj) {
        var _obj = obj,
            _inputs = _obj.find($("[required]")),
            _select = _obj.find( $("select[required]") );

        var _addEvents = function () {

                _obj.on({
                    'submit': function(){

                        $.each( _inputs, function(){

                            var curItem = $(this),
                                curAttr = curItem.attr("type");

                            if ( curAttr == "checkbox" ){
                                var curCheck = this.checked;
                                if ( !curCheck ){
                                    curItem.addClass("site__required-error");
                                    curItem.closest("fieldset").addClass('error');
                                }

                            }
                            else if ( curItem.is("select") ){

                                if ( !curItem.parents(".site__connection-hide_true").length ){
                                    if ( curItem.val() == "0" ){
                                        curItem.closest("fieldset").addClass('error');
                                    }
                                }

                            }
                            else if ( curItem.val() == '' ) {

                                if ( !curItem.parents(".site__connection-hide_true").length ){
                                    curItem.addClass("site__required-error");
                                    curItem.closest("fieldset").addClass('error');
                                }
                            }
                            else if ( curAttr == "email" ){
                                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                                if ( pattern.test(curItem.val()) == false ){
                                    curItem.addClass("site__required-error");
                                    curItem.closest("fieldset").addClass('error');
                                }
                            }

                        } );

                        if(!(_obj.find('.error').length) ){

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

                    'focus': function(){

                        var curItem = $(this),
                            closest = curItem.closest("fieldset"),
                            innerInputs = closest.find("input");

                        if(closest.hasClass('error')){
                            curItem.removeClass("site__required-error");
                            if ( innerInputs.length > 1 ){
                                if ( !closest.find(".site__required-error").length ){
                                    closest.removeClass('error');
                                }
                            } else {
                                closest.removeClass('error');
                            }
                        }

                    }

                });

                _select.on({
                    change: function(){
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
            _sliderWrapper = _obj.find( '.swiper-container' ),
            _nextBtn = _obj.find( '.swiper-button-next' ),
            _prevBtn = _obj.find( '.swiper-button-prev' ),
            _slider;


        //private methods
        var _initSlider = function () {

                _slider = new Swiper( _sliderWrapper, {
                    slidesPerView: 1,
                    nextButton: _nextBtn,
                    prevButton: _prevBtn,
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


    var SliderTeam = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _sliderWrapper = _obj.find( '.swiper-container' ),
            _slider;


        //private methods
        var _initSlider = function () {

                _slider = new Swiper( _sliderWrapper );

            },
            _init = function () {
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

} )();