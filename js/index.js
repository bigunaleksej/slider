window.onload = function () {

    var config1 = {
        // arbitrary number of images
        images: [
            'img/img_1.jpg',
            'img/img_2.jpg',
            'img/img_3.jpg',
            'img/img_4.jpg',
            'img/img_5.jpg'
        ],
        // possible values: 'auto', 'manual', 'automanual'
        mode: 'manual',
        swipeSpeed: 500,
        swipeDelay: 3000
    };

    var slider1 = new SliderFadeIn(document.getElementsByClassName('sliderWrapper1')[0], config1);
    var slider2 = new SliderFadeIn(document.getElementsByClassName('sliderWrapper2')[0], config1);

};