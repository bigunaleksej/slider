/**
 * Created by abigun on 8/20/2015.
 */
//(function () {
    var config = {
    // arbitrary number of images
    images: [
        'http://example.com/image-1.jpg',
        'http://example.com/image-2.jpg',
        'http://example.com/image-3.jpg',
        'http://example.com/image-4.jpg'
    ],
    // possible values: 'auto', 'manual', 'automanual'
    mode: 'auto',
    // arbitrary interger (miliseconds)
    swipeSpeed: 500,
    // arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
    swipeDelay: 3000
    };

    var Slider = {}

    Slider.init = function (id, config) {
        this.currentSlide = 0;
        this._crateSlider(id, config.images);
    };

    Slider._crateSlider = function (id, images) {
        var slider = document.createElement('div'),
            mask = document.createElement('div'),
            ul = document.createElement('ul'),
            slide, slideState;

        slider.setAttribute('class', 'slider');
        mask.setAttribute('class', 'mask');

        for (var i = 0, length = images.length; i < length; i++) {
            slideState = 'inactive';
            if (i === 0) {
                slideState = 'current';
            }
            if (i === 1) {
                slideState = 'next';
            }
            if (i === length-1) {
                slideState = 'previous';
            }

            slide = document.createElement('li');
            slide.setAttribute('class', slideState);
            slide.textContent = images[i];
            ul.appendChild(slide)
        }

        mask.appendChild(ul);
        slider.appendChild(mask);
        qs('#' + id).appendChild(slider);
    }

    var slider = Object.create(Slider);

    slider.init('slider', config);
//})();
