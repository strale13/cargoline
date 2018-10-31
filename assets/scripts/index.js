import Swiper from 'swiper';
// import SmoothScroll from 'smoothscroll';

// SmoothScroll({
//     stepSize: 50,
//     animationTime: 1500
// });

navigator.sayswho = (function() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

console.log(navigator.sayswho);

// SCROLL CAR//

if (document.querySelector('.car-1')) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const wWidth = window.innerWidth;
        console.log(wWidth);
        // if (scrollY - prevScrollY < 0) {
        //     document.querySelector('.car-1').style.opacity = 0;
        //     document.querySelector('.car-2').style.opacity = 0;
        //     document.querySelector('.car-3').style.opacity = 0;
        //     document.querySelector('.car-4').style.opacity = 0;
        //     document.querySelector('.car-5').style.opacity = 0;
        //     document.querySelector('.two-car-1').style.opacity = 0;
        //     document.querySelector('.two-car-2').style.opacity = 0;
        // } else {
        //     document.querySelector('.car-1').style.opacity = 1;
        //     document.querySelector('.car-2').style.opacity = 1;
        //     document.querySelector('.car-3').style.opacity = 1;
        //     document.querySelector('.car-4').style.opacity = 1;
        //     document.querySelector('.car-5').style.opacity = 1;
        //     document.querySelector('.two-car-1').style.opacity = 1;
        //     document.querySelector('.two-car-2').style.opacity = 1;
        //
        // }
        // prevScrollY = scrollY;
        if (scrollY < 600) {
            let pos = (scrollY / (400 * 0.1)) * ((wWidth * 0.6) * 0.1);
            document.querySelector('.car-1').style.transform = `translateX(${pos}px)`;
        }
        if (scrollY > 700 /* && scrollY < 1800 */) {
            let roadHeight = document.querySelector('.road-2').getBoundingClientRect().height;
            let pos = ((scrollY - 700) / (700 * 0.1)) * (roadHeight * 0.5) * 0.1;
            document.querySelector('.car-2').style.transform = `translateY(${pos}px)`;
            document.querySelector('.two-car-1').style.transform = `translateY(${-pos}px)`;
        }
        if (scrollY > 1200) {
            let pos = ((scrollY - 1200) / (1200 * 0.1)) * ((wWidth * 0.7) * 0.1);
            document.querySelector('.car-3').style.transform = `translateX(${-pos}px)`;
            // console.log(pos, whiteBlock.x + (whiteBlock.width / 2));
            if (pos < 1150) {
                document.querySelector('.car-3').setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/dest/icons/car-2.png');
            } else {
                document.querySelector('.car-3').setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/dest/icons/car-7.png');
            }
        }
        if (scrollY > 2400) {
            let roadHeight = document.querySelector('.road-4').getBoundingClientRect().height;
            let pos = ((scrollY - 2400) / (2400 * 0.1)) * (roadHeight * 0.8) * 0.1;
            document.querySelector('.car-4').style.transform = `translateY(${pos}px)`;
            document.querySelector('.two-car-2').style.transform = `translateY(${-pos}px)`;
        }
        if (scrollY > 2700) {
            let pos = ((scrollY - 2700) / (1300 * 0.1)) * (wWidth * 0.1);
            document.querySelector('.car-5').style.transform = `translateX(${pos}px)`;
        }
    });

    window.dispatchEvent(new Event('scroll'));
}

let swiper = new Swiper('.swiper-container-main', {
    slidesPerView: 6,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    breakpoints: {
        1080: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

let swiperTwo = new Swiper('.swiper-container-shop', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    on: {
        slideChange() {
            document.querySelectorAll('.slider-text-content').forEach((i) => i.classList.remove('show'));
            document.querySelectorAll('.slider-text-content')[this.realIndex].classList.add('show');
            console.log(this);
        }
    },
    autoplay: {
        delay: 10000,
        disableOnInteraction: false
    }
});

let swiperThree = new Swiper('.swiper-container-certificates', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

// MAP //

ymaps.ready(init);

function init() {
    let myMap = new ymaps.Map('map', {
        center: [55.156138, 30.348718],
        zoom: 10,
        controls: []
    });

    let myPlacemark = new ymaps.Placemark([55.156138, 30.348718], {
        hintContent: 'ООО «Карго Лайн»'
    });

    myMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)';

    myMap.geoObjects.add(myPlacemark);
}

// WAREHOUSE //

if (document.querySelector('.list-cargo')) {

    document.querySelector('.paint-block').addEventListener('mouseover', () => {
        document.querySelector('.paint').classList.add('active');
    });
    document.querySelector('.paint-block').addEventListener('mouseout', () => {
        document.querySelector('.paint').classList.remove('active');
    });

    document.querySelector('.smoke-drink-block').addEventListener('mouseover', () => {
        document.querySelector('.smoke-drink').classList.add('active');
    });
    document.querySelector('.smoke-drink-block').addEventListener('mouseout', () => {
        document.querySelector('.smoke-drink').classList.remove('active');
    });

    document.querySelector('.flower-block').addEventListener('mouseover', () => {
        document.querySelector('.flower').classList.add('active');
    });
    document.querySelector('.flower-block').addEventListener('mouseout', () => {
        document.querySelector('.flower').classList.remove('active');
    });

    document.querySelector('.eat-block').addEventListener('mouseover', () => {
        document.querySelector('.eat').classList.add('active');
    });
    document.querySelector('.eat-block').addEventListener('mouseout', () => {
        document.querySelector('.eat').classList.remove('active');
    });

    document.querySelector('.medic-block').addEventListener('mouseover', () => {
        document.querySelector('.medic').classList.add('active');
    });
    document.querySelector('.medic-block').addEventListener('mouseout', () => {
        document.querySelector('.medic').classList.remove('active');
    });

    document.querySelector('.gadgets-block').addEventListener('mouseover', () => {
        document.querySelector('.gadgets').classList.add('active');
    });
    document.querySelector('.gadgets-block').addEventListener('mouseout', () => {
        document.querySelector('.gadgets').classList.remove('active');
    });

    document.querySelector('.clothing-block').addEventListener('mouseover', () => {
        document.querySelector('.clothing').classList.add('active');
    });
    document.querySelector('.clothing-block').addEventListener('mouseout', () => {
        document.querySelector('.clothing').classList.remove('active');
    });

    document.querySelector('.cosmetics-block').addEventListener('mouseover', () => {
        document.querySelector('.cosmetics').classList.add('active');
    });
    document.querySelector('.cosmetics-block').addEventListener('mouseout', () => {
        document.querySelector('.cosmetics').classList.remove('active');
    });
}

// HINT MAPS//

if (document.querySelector('#mapmap')) {

    document.querySelector('#mapmap').addEventListener('mousemove', (e) => {
        let box = document.querySelector('.euroasia-map').getBoundingClientRect();
        document.querySelector('.hint-map').style.top = `${e.clientY - box.top - 40}px`;
        document.querySelector('.hint-map').style.left = `${e.clientX - box.left - 8}px`;
        let el;
        if (e.target instanceof SVGPathElement || (e.target instanceof SVGPolygonElement && !(e.target.parentElement instanceof SVGGElement))) {
            el = e.target;
            document.querySelector('.hint-map').style.display = '';
        } else if (e.target instanceof SVGPolygonElement && e.target.parentElement instanceof SVGGElement) {
            el = e.target.parentElement;
            document.querySelector('.hint-map').style.display = '';
        } else {
            document.querySelector('.hint-map').style.display = 'none';
        }
        if (el) {
            document.querySelector('.hint-map').innerText = el.dataset.title;
        }
    });
}

// HIDE HEADER //

window.onscroll = function() {
    var scrolled = window.pageYOffset;
    if (scrolled > 10) {
        document.querySelector('header').classList.add('hide-header');
    } else {
        document.querySelector('header').classList.remove('hide-header');
    }
};

/* NAV SCROLL */

document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        let target = document.querySelector(link.dataset.scroll);
        if (target) {
            target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    });
});

if (document.querySelector('.gallery-product')) {
    let galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    let galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
}

// SORTING PRODUCT //

document.querySelectorAll('.choise-product').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.choise-product').forEach((item) => {
            item.classList.remove('choise-product-active');
        });
        e.target.classList.add('choise-product-active');

        document.querySelectorAll('.features-product').forEach((item) => {
            item.style.display = 'none';
        });
        document.querySelector(`#${e.target.dataset.toggle}`).style.display = '';
    });
});

// SHOW PROFILE //

if (document.querySelector('.show-profile')) {
    document.querySelectorAll('.show-profile').forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.jobs-profile').forEach((i) => {
                if (i.id !== item.dataset.toggle) {
                    i.classList.remove('jobs-profile-active');
                }
            });

            document.querySelector(`#${item.dataset.toggle}`).classList.toggle('jobs-profile-active');
        });
    });
}

// LOADING PHOTO //

document.querySelectorAll('form').forEach((item) => {
    let load = item.querySelector('.load');
    if (load) {
        load.addEventListener('click', (e) => {
            e.preventDefault();
            item.querySelector('.photo-loading').click();
            load.classList.add('not-active');
        });
    }
});

// OPEN POPUP //

document.querySelectorAll('.order-cargo').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.overlay-popup').classList.add('popup-show');
        document.querySelector('.overlay').classList.add('body-blur');
        document.querySelector('body').classList.add('overflow');
    });
});

// CLOSE POPUP //

document.querySelectorAll('.close-popup').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.overlay-popup').classList.remove('popup-show');
        document.querySelector('.overlay').classList.remove('body-blur');
        document.querySelector('body').classList.remove('overflow');
    });
});

// OPEN POPUP //

document.querySelectorAll('.check-price').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.overlay-popup-price').classList.add('popup-show');
        document.querySelector('.overlay').classList.add('body-blur');
        document.querySelector('body').classList.add('overflow');
    });
});

// CLOSE POPUP //

document.querySelectorAll('.close-popup').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.overlay-popup-price').classList.remove('popup-show');
        document.querySelector('.overlay').classList.remove('body-blur');
        document.querySelector('body').classList.remove('overflow');
    });
});

// OPEN POPUP //

document.querySelectorAll('.certificates-image').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        let image = item.cloneNode();
        document.querySelector('.image-doc').appendChild(image);
        document.querySelector('.overlay-popup-certificates').classList.add('popup-show');
        document.querySelector('.overlay').classList.add('body-blur');
        document.querySelector('body').classList.add('overflow');

        document.querySelectorAll('.close-popup').forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.overlay-popup-certificates').classList.remove('popup-show');
                document.querySelector('.image-doc').removeChild(image);
                document.querySelector('.overlay').classList.remove('body-blur');
                document.querySelector('body').classList.remove('overflow');
            });
        });
    });
});

// MENU //

document.querySelector('.button-menu').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.button-menu').classList.toggle('on');
    document.querySelector('.navigation').classList.toggle('show');
    document.querySelector('body').classList.toggle('overflow');
});

document.querySelector('.button-menu').addEventListener('tap', (e) => {
    e.preventDefault();
    document.querySelector('.button-menu').classList.toggle('on');
    document.querySelector('.navigation').classList.toggle('show');
    document.querySelector('body').classList.toggle('overflow');
});

document.querySelectorAll('.link-nav').forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector('.button-menu').classList.remove('on');
        document.querySelector('.navigation').classList.remove('show');
        document.querySelector('body').classList.remove('overflow');
    });
});
