( function() {

    $( function() {

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