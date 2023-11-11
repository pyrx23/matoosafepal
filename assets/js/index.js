/**
 * Template Name: bootstrap - v5.1.3
 * Author: bootstrap.com
 * License: https://v5.bootcss.com/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  /**
   * isMobile
   */
  function isMobile() {
    return 'navigator' in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
  }
  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Backed Slider
   */
  const backedSwiper = new Swiper('.backed-slider', {
    speed: 4000,
    loop: true,
    freeMode: true,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      pauseOnMouseEnter: true,
    },
    slidesPerView: 'auto',
    loopFillGroupWithBlank: true,
    normalizeSlideIndex: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      720: {
        slidesPerView: 8,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 8,
        spaceBetween: 25
      },
      1200: {
        slidesPerView: 8,
        spaceBetween: 25
      },
      1440: {
        slidesPerView: 10,
        spaceBetween: 25
      },
      1920: {
        slidesPerView: 14,
        spaceBetween: 25
      }
    }
  });
  let nextTransForm = '', // 存放鼠标悬浮时的transform属性
    nextTransPosition = 0, // 轮播图原本应移动到的位置
    nowTransPosition = 0, // 鼠标悬浮时时轮播图位置
    nowTransForm = '', // 存放鼠标悬浮时轮播图的真实transform属性（非行内属性）
    nextTime = 0,
    sildeWidth = 0; //silde width

  backedSwiper.el.onmouseover = function () {
    nextTransForm = $('#backed-swiper-wrapper')[0].style.transform;
    nextTransPosition = -1 * parseInt(nextTransForm.split('px')[0].split("translate3d(")[1]);
    nowTransForm = window.getComputedStyle($('#backed-swiper-wrapper')[0], false)["transform"];
    nowTransPosition = -1 * parseInt(window.getComputedStyle($('#backed-swiper-wrapper')[0], false)["transform"].split("1,")[2].split(",")[0]);
    sildeWidth = $('#backed-swiper-wrapper').find('.swiper-slide')[0].style.width.split('px')[0];
    // 计算轮播图从暂停位置移动到原本应到的位置所用的时间
    nextTime = 4000 * ((nextTransPosition - nowTransPosition) / sildeWidth);
    // 改变行内transform属性
    $('#backed-swiper-wrapper')[0].style.transform = nowTransForm;
    $('#backed-swiper-wrapper')[0].style.transitionDuration = "0ms";
    backedSwiper.autoplay.stop();
  }
  backedSwiper.el.onmouseout = function () {
    $('#backed-swiper-wrapper')[0].style.transform = nextTransForm;
    $('#backed-swiper-wrapper')[0].style.transitionDuration = `${nextTime}ms`;
    backedSwiper.autoplay.start();
  }
  /**
   * stand-out - mobile - 
   * 
   */
  if (isMobile()) {
    new Swiper('.enumera-mobile-list', {
      speed: 500,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      // navigation: {
      //   nextEl: '.button-next',
      //   prevEl: '.button-prev',
      // },
      pagination: {
        el: '.enumera-mobile-pagination'
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        720: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    })
  }
  /**
   * trusted --- slider ------------- start
   * 
   */
  let trustedSwiperOp = {
    loop: true,
    init: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
  };
  if (isMobile()) {
    Object.assign(trustedSwiperOp, {
      speed: 1000,
      pagination: {
        el: '.swiper-pagination-trusted',
      }
    });
  } else {
    Object.assign(trustedSwiperOp, {
      speed: 8000,
      freeMode: true,
      allowTouchMove: false,
      autoplay: {
        disableOnInteraction: false,
        stopOnLastSlide: false,
        pauseOnMouseEnter: true,
        delay: 0,
      },
      loopFillGroupWithBlank: true,
      normalizeSlideIndex: true,
    });
  }
  const trustedSwiper = new Swiper('.trusted-slider', {
    ...trustedSwiperOp,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      720: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        spaceBetween: 30
      },
      1200: {
        spaceBetween: 30
      },
      1440: {
        spaceBetween: 30
      },
      1920: {
        spaceBetween: 30
      }
    }
  });
  // aosjs动画执行事件 - trusted-swiper
  document.addEventListener('aos:in:trusted-swiper', function () {
    // 当动画执行时切换到第一个slide
    // trustedSwiper.slideToLoop(0 , 500, false);
    trustedSwiper.init();
    let trustedNextTransForm = '', // 存放鼠标悬浮时的transform属性
    trustedNextTransPosition = 0, // 轮播图原本应移动到的位置
    trustedNowTransPosition = 0, // 鼠标悬浮时时轮播图位置
    trustedNowTransForm = '', // 存放鼠标悬浮时轮播图的真实transform属性（非行内属性）
    trustedNextTime = 0,
    trustedSildeWidth = 0; //silde width

    if (!isMobile()) {
      trustedSwiper.el.onmouseover = function () {
        trustedNextTransForm = $('#trusted-swiper-wrapper')[0].style.transform;
        trustedNextTransPosition = -1 * parseInt(trustedNextTransForm.split('px')[0].split("translate3d(")[1]);
        trustedNowTransForm = window.getComputedStyle($('#trusted-swiper-wrapper')[0], false)["transform"];
        trustedNowTransPosition = -1 * parseInt(window.getComputedStyle($('#trusted-swiper-wrapper')[0], false)["transform"].split("1,")[2].split(",")[0]);
        trustedSildeWidth = 525;
        // 计算轮播图从暂停位置移动到原本应到的位置所用的时间
        trustedNextTime = 8000 * ((trustedNextTransPosition - trustedNowTransPosition) / trustedSildeWidth);
        // 改变行内transform属性
        $('#trusted-swiper-wrapper')[0].style.transform = trustedNowTransForm;
        $('#trusted-swiper-wrapper')[0].style.transitionDuration = "0ms";
        trustedSwiper.autoplay.stop();
      }
      trustedSwiper.el.onmouseout = function () {
        $('#trusted-swiper-wrapper')[0].style.transform = trustedNextTransForm;
        $('#trusted-swiper-wrapper')[0].style.transitionDuration = `${trustedNextTime}ms`;
        trustedSwiper.autoplay.start();
      }
    }
  });
})()