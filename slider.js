/**
 * Created by abigun on 8/20/2015.
 */
var Slider = {
        init: function (id, config) {
            this._crateSlider(id, config.images);
            this.sliderId = id;
            this.currentSlide = 0;
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
            document.querySelector('#' + id).appendChild(slider);
        },

        _next: function () {
            var involvedElements = this._getInvolvedElement(),
                newInvolvedElement = involvedElements[2].nextElementSibling || this._slides[0];

            involvedElements[0].setAttribute('class', 'inactive');
            involvedElements[1].setAttribute('class', 'previous');
            involvedElements[2].setAttribute('class', 'current');
            newInvolvedElement.setAttribute('class', 'next');
        },

        _previous: function () {
            var involvedElements = this._getInvolvedElement(),
                newInvolvedElement = involvedElements[0].previousElementSibling || this._slides[this._slides.length-1];

            involvedElements[2].setAttribute('class', 'inactive');
            newInvolvedElement.setAttribute('class', 'previous');
            involvedElements[0].setAttribute('class', 'current');
            involvedElements[1].setAttribute('class', 'next');
        },

        _getInvolvedElement: function () {
            var elments = [];

            elments.push(document.querySelector('#' + this.sliderId + ' .previous'));
            elments.push(document.querySelector('#' + this.sliderId + ' .current'));
            elments.push(document.querySelector('#' + this.sliderId + ' .next'));
            return elments;
        },
};


