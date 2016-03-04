(function () {

    $(function () {

        $.each($( '.call-manager__feedback' ), function() {
            new FormValidation( $( this ) );
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

        $( '.questions' ).each( function() {
            new Questions( $( this ) );
        });

        $( '.your-choice__slider' ).each(function() {
            new SliderChoice( $ ( this ) );
        });

        $( '.way__content' ).each( function() {
            new Decision ( $( this ) );
        } );

        $( '.call-manager' ).each(function() {
            new CallToManager( $ ( this ) );
        });

    });

    var CallToManager = function (obj) {

        //private properties
        var _obj = obj,
            _managerOpen = _obj.find( '.call-manager__feedback' ),
            _openButton = _obj.find( '.btn_1' ),
            _closeButton = _obj.find( '.call-manager__close' );


        //private methods
        var _initCallToManager = function() {

                _openButton.on('click', function() {
                    _managerOpen.addClass( 'open' );
                    return false
                });
                _closeButton.on('click', function() {
                    _managerOpen.removeClass( 'open' );
                    return false
                });
            },
            _init = function () {
                _initCallToManager();
            };

        //public properties

        //public methods

        _init();
    };

    var Decision = function ( obj ) {

        //private properties
        var _obj = obj,
            _start = _obj.offset().top,
            _window = $( window );

        //private methods
        var _scrollCheck = function(){
                var _scrolling = _window.scrollTop();

                if ( _scrolling > _start - 100 ) {
                    _obj.addClass( 'visible' );
                    _offScrolling();
                }

            },
            _onEvents = function(){
                _window.on( {
                    scroll: function () {
                        _scrollCheck ();
                    }
                } )
            },
            _offScrolling = function () {
                _window.off( 'scroll' )
            },
            _init = function () {
                _scrollCheck();
                _onEvents();
            };

        //public properties

        //public methods

        _init();
    };

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
                        effect : 'fade',
                        loop: true
                    } );

                } else {

                    _slider = new Swiper ( _sliderWrapper, {
                        autoplay: 4000,
                        speed: 500,
                        loop: true
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

    var Questions = function ( obj ) {

        //private properties
        var _obj = obj,
            _body = $( 'body, html' ),
            _request = new XMLHttpRequest();

        //private methods
        var _addEvents = function() {

                _obj.on( 'change', '.questions__radio', function() {

                    var currentForm = $( this ).parents( '.questions__item' );

                    _removeQuestion( currentForm );

                    _loadQuestion( currentForm );

                });

            },
            _loadQuestion = function( currentForm ) {

                _request.abort();

                _request = $.ajax( {
                    url: 'php/questions.php',
                    data: currentForm.serialize(),
                    dataType: 'html',
                    type: 'GET',
                    success:function( data ) {

                        _addQuestion( data );

                    },
                    error: function( XMLHttpRequest ) {

                        if ( XMLHttpRequest.statusText != 'abort' ) {
                            console.log( 'ERROR!!!' );
                        }

                    }
                } );

            },
            _removeQuestion = function( currentForm ) {

                currentForm.nextAll().remove();

            },
            _addQuestion = function( data ) {

                var question = $( data ),
                    questionTopPosition;

                question.addClass( 'hidden' );

                _obj.append( question );

                question = _obj.find( '.questions__item.hidden' );

                questionTopPosition = question.offset().top - 30;

                _body.animate( { scrollTop: questionTopPosition }, 600 );

                question.addClass( 'questions__item-wait' );

                question.removeClass( 'hidden' );

                // css animation
                setTimeout( function() {

                    question.removeClass( 'questions__item-wait' );

                }, 400 );

            },
            _init = function() {
            _addEvents();
        };

        //public properties

        //public methods

        _init();
    };

    var SliderChoice = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _sliderWrapper = _obj.find( '.swiper-container' ),
            _nextBtn = _obj.find( '.swiper-button-next' ),
            _prevBtn = _obj.find( '.swiper-button-prev' ),
            _slider;


        //private methods
        var _initSlider = function() {

                _slider = new Swiper(_sliderWrapper, {
                    slidesPerView: 1,
                    nextButton: _nextBtn,
                    prevButton: _prevBtn,
                    loop:true,
                    spaceBetween: 30
                });

            },
            _init = function() {
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

    var SliderPortfolio = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _sliderWrapper = _obj.find( '.swiper-container' ),
            _nextBtn = _obj.find( '.swiper-button-next' ),
            _prevBtn = _obj.find( '.swiper-button-prev' ),
            _slider;


        //private methods
        var _initSlider = function() {

                _slider = new Swiper(_sliderWrapper, {
                    slidesPerView: 3,
                    nextButton: _nextBtn,
                    prevButton: _prevBtn,
                    spaceBetween: 30,
                    speed: 500,
                    loop: true
                });

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _initSlider();

            };

        //public properties

        //public methods

        _init();
    };

    var FormValidation = function(obj) {
        var _obj = obj,
            _inputs = _obj.find( $ ( '[ required ]' ) ),
            _select = _obj.find( $ ( 'select[ required ]' ) );

        var _addEvents = function() {

                _obj.on({
                    'submit': function() {

                        $.each( _inputs, function() {

                            var curItem = $( this ),
                                curAttr = curItem.attr( 'type' );

                            if( curAttr == 'checkbox' ) {
                                var curCheck = this.checked;
                                if( !curCheck ) {
                                    curItem.addClass( 'site__required-error' );
                                    curItem.closest( 'fieldset' ).addClass( 'error' );
                                }

                            } else if( curItem.is("select") ){

                                if( !curItem.parents( '.site__connection-hide_true' ).length ) {
                                    if( curItem.val() == "0" ){
                                        curItem.closest( 'fieldset' ).addClass( 'error' );
                                    }
                                }

                            } else if( curItem.val() == '' ) {

                                if( !curItem.parents( '.site__connection-hide_true' ).length ) {
                                    curItem.addClass( 'site__required-error' );
                                    curItem.closest( 'fieldset' ).addClass( 'error' );
                                }
                            } else if( curAttr == 'email' ){
                                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                                if( pattern.test(curItem.val()) == false ){
                                    curItem.addClass( 'site__required-error' );
                                    curItem.closest( 'fieldset' ).addClass( 'error' );
                                }
                            }

                        } );

                        if(!( _obj.find( '.error' ).length) ) {

                            if( _obj.hasClass( 'call-manager__feedback' ) ) {

                                $.ajax ( {
                                    url: 'php/form.php',
                                    dataType: 'html',
                                    timeout: 20000,
                                    type: "GET",
                                    data: {
                                        send: 'true',
                                        name: $( '#name' ).val(),
                                        phone: $( '#phone' ).val(),
                                        time: $( '#time' ).val()
                                    },
                                    success: function () {
                                        $( '.call-manager__feedback' ).removeClass( 'open' );
                                        $( '.call-manager__successfully' ).addClass( 'success' );
                                    },
                                    error: function (XMLHttpRequest) {
                                        if(XMLHttpRequest.statusText != 'abort' ) {
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

                    'focus': function() {

                        var curItem = $( this ),
                            closest = curItem.closest( 'fieldset' ),
                            innerInputs = closest.find( 'input' );

                        if( closest.hasClass( 'error' ) ) {
                            curItem.removeClass( 'site__required-error' );
                            if( innerInputs.length > 1 ) {
                                if( !closest.find( '.site__required-error' ).length ) {
                                    closest.removeClass( 'error' );
                                }
                            } else {
                                closest.removeClass( 'error' );
                            }
                        }

                    }

                });

                _select.on ( {
                    change: function() {
                        var curItem = $( this );
                        curItem.closest( 'fieldset' ).removeClass( 'error' );
                    }
                });
            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

})();