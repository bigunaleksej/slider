//Main Slider class
var Slider = {
    init: function (id, config) {
        this.sliderWrapperEl = document.querySelector('#' + id);

        this._setOptions(config);
        this._crateSlider(id, config.images);
        this._setEventsListener();
    },

    _setOptions: function () {
        this.swipeSpeed = 1000;
        this.swipeDelay = 3000;
        this.animationType = 'slide';
    },

    _setEventsListener: function () {
        if (this.mode === 'auto' || this.mode === 'automanual') {
            this._setAutoSlideListener();
            this.play();
        }
        if (this.mode === 'manual' || this.mode === 'automanual') {
            this._setSwipeListener();
        }
    },

    _setAutoSlideListener: function () {
        this.sliderEl.addEventListener('mouseenter', (function () {
            console.info('stop');
            this.stop()
        }).bind(this));

        this.sliderEl.addEventListener('mouseleave', (function () {
            console.info('play');
            this.play()
        }).bind(this));
    },

    _setSwipeListener: function () {
        var x, newX, detect = false;

        //Init events for touch devices
        this.sliderEl.addEventListener('touchstart', function (e) {
            detect = true;
            e.preventDefault();
            newX = x = e.changedTouches[0].pageX;
        });

        this.sliderEl.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if (detect) {
                newX = e.changedTouches[0].pageX;
            }
        })

        this.sliderEl.addEventListener('touchend', makeSwipe.bind(this));

        //Init events for desktop
        this.sliderEl.addEventListener('mousedown', function (e) {
            detect = true;
            e.preventDefault();
            newX = x = e.x;
        });

        this.sliderEl.addEventListener('mousemove', function (e) {
            e.preventDefault();
            if (detect) {
                newX = e.x;
            }
        })

        this.sliderEl.addEventListener('mouseup', makeSwipe.bind(this));

        function makeSwipe(e) {
            var deltaX = x - newX;

            e.preventDefault();
            if (deltaX > 50) {
                this.next.bind(this)();
            }
            if (deltaX < -50) {
                this.previous.bind(this)();
            }
            detect = false;
        }
    },

    _crateSlider: function (id, images) {
        var slider = document.createElement('div'),
            mask = document.createElement('div'),
            ul = document.createElement('ul'),
            slide, slideImg;

        this._slides = ul.children;
        slider.setAttribute('class', 'slider');
        mask.setAttribute('class', 'mask');
        ul.setAttribute('class', this.animationType);

        for (var i = 0, length = images.length; i < length; i++) {
            slide = document.createElement('li');
            slide.setAttribute('class', 'inactive');
            slideImg = document.createElement('img');
            slideImg.src = images[i];
            slide.appendChild(slideImg);
            ul.appendChild(slide);
        }

        this._slides[0].setAttribute('class', 'current');
        this._slides[1].setAttribute('class', 'next');
        this._slides[this._slides.length-1].setAttribute('class', 'previous');

        mask.appendChild(ul);
        slider.appendChild(mask);
        this.sliderWrapperEl.appendChild(slider);
        this.sliderEl = this.sliderWrapperEl.querySelector('.slider');
    },

    _getInvolvedSlides: function () {
        var slides = [];

        slides.push(this.sliderEl.querySelector('.previous'));
        slides.push(this.sliderEl.querySelector('.current'));
        slides.push(this.sliderEl.querySelector('.next'));
        return slides;
    },

    next: function () {
        var involvedSlides = this._getInvolvedSlides(),
            newInvolvedSlide = involvedSlides[2].nextElementSibling || this._slides[0];

        involvedSlides[0].setAttribute('class', 'inactive');
        involvedSlides[1].setAttribute('class', 'previous');
        involvedSlides[2].setAttribute('class', 'current');
        newInvolvedSlide.setAttribute('class', 'next');

        return true;
    },

    previous: function () {
        var involvedSlides = this._getInvolvedSlides(),
            newInvolvedSlide = involvedSlides[0].previousElementSibling || this._slides[this._slides.length-1];

        involvedSlides[2].setAttribute('class', 'inactive');
        newInvolvedSlide.setAttribute('class', 'previous');
        involvedSlides[0].setAttribute('class', 'current');
        involvedSlides[1].setAttribute('class', 'next');

        return true;
    },

    play: function() {
        this.stop();
        this._play = setInterval(this.next.bind(this), this.swipeDelay);
    },

    stop: function() {
        clearInterval(this._play);
    }
};

// SlideSlider subclass
var SlideSlider = Object.create(Slider);

SlideSlider._setOptions = function (config) {
    this.mode = config.mode || 'manual';
    this.swipeSpeed = config.swipeSpeed || 1000;
    this.swipeDelay = config.swipeDelay || 3000;
    this.animationType = 'slide';
};

// FadeInSlider subclass
var FadeInSlider = Object.create(Slider);

FadeInSlider._setOptions = function (config) {
    this.mode = config.mode || 'manual';
    this.swipeSpeed = config.swipeSpeed || 1000;
    this.swipeDelay = config.swipeDelay || 3000;
    this.animationType = 'fadein';
};

