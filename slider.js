/**
 * Created by abigun on 8/20/2015.
 */
var Slider = {
        init: function (id, config) {
            this._crateSlider(id, config.images);
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

            for (var i = 0, length = images.length; i < length; i++) {
                slide = document.createElement('li');
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

        },
        _previous: function () {
        }
};


