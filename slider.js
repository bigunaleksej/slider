var Slider = {
        init: function (id, config) {
            this.sliderEl = document.querySelector('#' + id);

            this._setOptions(config);
            this._crateSlider(id, config.images);
            this._setEventsListener();
            this._afterInit();
        },

        _afterInit: function () {
            this.play();
        },

        _setOptions: function () {
            this.autoDelay = 2000;
        },

        _setEventsListener: function () {
            this.sliderEl.addEventListener('mouseenter', function () {
                slider.stop()
            });

            this.sliderEl.addEventListener('mouseleave', function () {
                slider.play()
            });
        },

        _crateSlider: function (id, images) {
            var slider = document.createElement('div'),
                mask = document.createElement('div'),
                ul = document.createElement('ul'),
                slide;

            this._slides = ul.children;
            slider.setAttribute('class', 'slider');
            mask.setAttribute('class', 'mask');
            ul.setAttribute('class', 'slide');

            for (var i = 0, length = images.length; i < length; i++) {
                slide = document.createElement('li');
                slide.setAttribute('class', 'inactive');
                slide.id = 'slide' + i;
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
            this.sliderEl.appendChild(slider);
        },

        next: function () {
            var involvedSlides = this._getInvolvedSlides(),
                newInvolvedSlide = involvedSlides[2].nextElementSibling || this._slides[0];

            involvedSlides[0].setAttribute('class', 'inactive');
            involvedSlides[1].setAttribute('class', 'previous');
            involvedSlides[2].setAttribute('class', 'current');
            newInvolvedSlide.setAttribute('class', 'next');
        },

        previous: function () {
            var involvedSlides = this._getInvolvedSlides(),
                newInvolvedSlide = involvedSlides[0].previousElementSibling || this._slides[this._slides.length-1];

            involvedSlides[2].setAttribute('class', 'inactive');
            newInvolvedSlide.setAttribute('class', 'previous');
            involvedSlides[0].setAttribute('class', 'current');
            involvedSlides[1].setAttribute('class', 'next');
        },

        play: function() {
            this.stop();
            this._play = setInterval(this.next.bind(this), this.autoDelay);
        },

        stop: function() {
            clearInterval(this._play);
        },

        _getInvolvedSlides: function () {
            var slides = [];

            slides.push(this.sliderEl.querySelector('.previous'));
            slides.push(this.sliderEl.querySelector('.current'));
            slides.push(this.sliderEl.querySelector('.next'));
            return slides;
        },
};

var SwipeSlider = Object.create(Slider);

SwipeSlider._setEventsListener = function () {
    this.sliderEl.addEventListener('mouseenter', function () {
        console.info('SwipeSlider');
        slider.stop()
    });

    this.sliderEl.addEventListener('mouseleave', function () {
        console.info('SwipeSlider');
        slider.play()
    });
};

