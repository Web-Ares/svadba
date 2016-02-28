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

        $("#form").submit(function() {
            var form_data = $(this).serialize();
            $.ajax({
                type: "POST",
                url: "form.php",
                data: form_data,
                success: function() {
                    $('.call-manager__form').addClass('success');
                    $('.call-manager__successfully').addClass('success').fadeOut(10000);
                }
            });
        });

        $('.swiper-container').each(function () {
            Slider($(this));
        });

        $( '.our-team__slider' ).each(function () {

            SliderTeam( $( this ) );

        });
        
        $( 'input[type="radio"]' ).each( function(){
            new NiceRadio( $( this ) );
        } );

        $('.steps').each( function(){
            new Contact( $(this) );
        } );
        
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
    var NiceRadio = function( obj ){
        this.obj = obj;

        this.init();
    };
    NiceRadio.prototype = {
        init: function(){
            var self = this;

            self.core = self.core();
            self.core.build();
        },
        core: function(){
            var self = this;

            return {
                build: function(){
                    self.core.startView();

                },
                startView: function(){
                    self.name = self.obj.attr( 'name' );
                    self.wrap = $( '<div class="nice-radio"></div>' );
                    if( self.obj[ 0 ].checked == true ){
                        self.wrap.addClass( 'nice-radio_checked' );
                    }

                    self.obj.wrap( self.wrap );
                    self.core.controls();
                },
                changeView: function(){
                    var curItem;
                    $( 'input[type="radio"]').each( function(){
                        curItem = $( this );

                        if( curItem.attr( 'name' ) == self.name ){
                            if( this.checked == true ){
                                curItem.parent().addClass( 'nice-radio_checked' );
                            } else {
                                curItem.parent().removeClass( 'nice-radio_checked' );
                            }
                        }
                    } );
                },
                controls: function(){
                    self.obj.on( {
                        change: function(){
                            self.core.changeView();
                        }
                    } );

                    self.obj.parent().on( {
                        click: function(){
                            self.obj[ 0 ].checked = true;
                            self.obj.trigger( 'change' );
                        }
                    } );
                }
            };
        }
    };

    var Contact = function (obj) {


        //private methods

        var _obj=obj,
             _i=1;
        _addEvents = function () {



            _obj.on('click','.steps__item-elem',function(){



                var _cur_data_que = $(this).parent().attr('data-que'),
                    _curValue = $(this).find('.steps__item-radio').val(),

                    _curBlock = $('.steps__item');

                _curBlock.each(function(){

                    var _each_data_que = $(this).attr('data-que');


                    if(_each_data_que > _cur_data_que){
                        $(this).remove();
                    }

                });



                $.ajax({
                    url: "php/ajax.php?button="+_curValue,
                    data: "button"+_curValue,
                    dataType: 'html',
                    type: "GET",
                    success: function(data) {
                        _i++;
                        _obj.append(data);
                        return false;
                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != "abort") {
                            console.log("ERROR!!!");
                        }
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