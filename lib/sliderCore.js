(function () {
    window.SliderSlide = SliderSlide;
    window.SliderFadeIn = SliderFadeIn;

    function SliderCore(el, config) {
        this.options = {};
        this.init(el, config);
    }

    SliderCore.prototype.init = function (el, config) {
        this.sliderContainerEl = el;
        this.setOptions(config);
        this.crateSlider(config.images);
        this.setEventsListener();
    };

    SliderCore.prototype.setOptions = function () {
        this.options.swipeSpeed = 1000;
        this.options.swipeDelay = 3000;
        this.options.animationType = 'slide';
        this.options.mode = 'auto';
    };

    SliderCore.prototype.setEventsListener = function () {
        if (this.options.mode === 'auto' || this.options.mode === 'automanual') {
            this.setAutoSlideListener();
            this.play();
        }
        if (this.options.mode === 'manual' || this.options.mode === 'automanual') {
            this.setSwipeListener();
        }
    };

    SliderCore.prototype.setAutoSlideListener = function () {
        this.sliderEl.addEventListener('mouseenter', (function () {
            this.stop()
        }).bind(this));

        this.sliderEl.addEventListener('mouseleave', (function () {
            this.play()
        }).bind(this));
    };

    SliderCore.prototype.setSwipeListener = function () {
        var x, newX, detect = false;

        //Init simple events for touch devices
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
        });

        this.sliderEl.addEventListener('touchend', makeSwipe.bind(this));

        //Init simple events for desktop
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
        });

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
    };

    SliderCore.prototype.crateSlider = function (images) {
        var slider = createEl('div', {class: 'slider'}),
            mask = createEl('div', {class: 'mask'}),
            ul = createEl('ul', {class: this.options.animationType}),
            slide, slideImg;

        this.slides = ul.children;
        this.sliderEl = slider;

        for (var i = 0, length = images.length; i < length; i++) {
            slide = createEl('li', {class: 'inactive'});
            slide.style.transitionDuration = this.options.swipeSpeed + 'ms';
            slideImg = document.createElement('img');
            slideImg.src = images[i];
            slide.appendChild(slideImg);
            ul.appendChild(slide);
        }

        this.slides[0].setAttribute('class', 'current');
        this.slides[1].setAttribute('class', 'next');
        this.slides[this.slides.length - 1].setAttribute('class', 'previous');

        mask.appendChild(ul);
        slider.appendChild(mask);
        this.sliderContainerEl.appendChild(slider);

        function createEl(tagName, attributes) {
            var el = document.createElement(tagName);

            for (var attributeName in attributes) {
                if (attributes.hasOwnProperty(attributeName)) {
                    el.setAttribute(attributeName, attributes[attributeName]);
                }
            }

            return el;
        }
    };

    SliderCore.prototype.next = function () {
        var involvedSlides = this.getInvolvedSlides(),
            newInvolvedSlide = involvedSlides[2].nextElementSibling || this.slides[0];

        involvedSlides[0].setAttribute('class', 'inactive');
        involvedSlides[1].setAttribute('class', 'previous');
        involvedSlides[2].setAttribute('class', 'current');
        newInvolvedSlide.setAttribute('class', 'next');
    };

    SliderCore.prototype.previous = function () {
        var involvedSlides = this.getInvolvedSlides(),
            newInvolvedSlide = involvedSlides[0].previousElementSibling || this.slides[this.slides.length - 1];

        involvedSlides[2].setAttribute('class', 'inactive');
        newInvolvedSlide.setAttribute('class', 'previous');
        involvedSlides[0].setAttribute('class', 'current');
        involvedSlides[1].setAttribute('class', 'next');
    };

    SliderCore.prototype.play = function () {
        this.stop();
        this._play = setInterval(this.next.bind(this), this.options.swipeDelay);
    };

    SliderCore.prototype.stop = function () {
        clearInterval(this._play);
    };

    SliderCore.prototype.getInvolvedSlides = function () {
        var slides = [];

        slides.push(this.sliderEl.querySelector('.previous'));
        slides.push(this.sliderEl.querySelector('.current'));
        slides.push(this.sliderEl.querySelector('.next'));
        return slides;
    };
    //SliderSlide subclass
    function SliderSlide(el, config) {
        SliderCore.call(this, el, config);
    }

    SliderSlide.prototype = Object.create(SliderCore.prototype);
    SliderSlide.prototype.constructor = SliderSlide;

    SliderSlide.prototype.setOptions = function (config) {
        this.options.mode = config.mode || 'manual';
        this.options.swipeSpeed = config.swipeSpeed || 1000;
        this.options.swipeDelay = config.swipeDelay || 3000;
        this.options.animationType = 'slide';
    };
    //SliderFadeIn subclass
    function SliderFadeIn(el, config) {
        SliderCore.call(this, el, config);
    }

    SliderFadeIn.prototype = Object.create(SliderCore.prototype);
    SliderFadeIn.prototype.constructor = SliderFadeIn;

    SliderFadeIn.prototype.setOptions = function (config) {
        this.options.mode = config.mode || 'manual';
        this.options.swipeSpeed = config.swipeSpeed || 1000;
        this.options.swipeDelay = config.swipeDelay || 3000;
        this.options.animationType = 'fadein';
    };
})();