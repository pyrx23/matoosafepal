
const base_url = '/sapi/rest/all/V1'
const { find } = Array.prototype;
/**
 * @param  {[type]} event  
 * @param  {[String]} tarStr
 * @return {[element|undefined]} 
 */
 function getEventTarget(event, tarStr) {
    if (!event || !tarStr) { return null; }
    const end = event.currentTarget;
    const start = event.target;
    const tarList = end.querySelectorAll(tarStr) || [];
    /* eslint-disable-next-line */
    return find.call(tarList, el => start === el || (el.compareDocumentPosition(start) & 16));
  }
/**
 * 
 * @param {*} fun 
 * @param {*} delay 
 * @param {*} time 
 * @returns 
 */
function throttle(fun, delay, time) {
    let timeout
    let startTime = new Date()
    return function () {
        let context = this
        let args = Array.prototype.slice.call(arguments)
        let curTime = new Date()
        clearTimeout(timeout)
        if (curTime - startTime >= time) {
            fun.apply(context, args)
            startTime = curTime
        } else {
            timeout = setTimeout(function () {
                fun.apply(context, args)
            }, delay)
        }
    }
};
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

const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}

/**
 * Navbar links active state on scroll
 */
// let navbarlinks = select('#navbar .scrollto', true)
// const navbarlinksActive = () => {
//     let position = window.scrollY + 200
//     navbarlinks.forEach(navbarlink => {
//     if (!navbarlink.hash) return
//     let section = select(navbarlink.hash)
//     if (!section) return
//     if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
//         navbarlink.classList.add('active')
//     } else {
//         navbarlink.classList.remove('active')
//     }
//     })
// }
// window.addEventListener('load', navbarlinksActive)
// onscroll(document, navbarlinksActive)

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
        offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
    })
}

/**
 * Toggle .header-scrolled class to #header when page is scrolled
 */
let selectHeader = select('#header')
if (selectHeader) {
    const headerScrolled = () => {
    if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
    } else {
        selectHeader.classList.remove('header-scrolled')
    }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
}
/**
 * Back to top button
 */
let backtotop = select('.back-to-top')
if (backtotop) {
    const toggleBacktotop = () => {
        if (window.scrollY > 100) {
            backtotop.classList.add('active')
        } else {
            backtotop.classList.remove('active')
        }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
    backtotop.addEventListener('click',function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    })
}
/**
   * Mobile nav toggle
   */
  function mobileNavToggle() {
    select('#header').classList.toggle('pdtb-20')
    select('#navbar').classList.toggle('navbar-mobile')
    select('body').classList.toggle('overflow-hidden')
    // select('.scrollto').click()
  }
 on('click', '.mobile-nav-toggle', function(e) {
    mobileNavToggle()
  })
  on('click', '.dropdown-off', function() {
    mobileNavToggle()
  })
  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile') && $(this).siblings('.dropdown-mobile').length) {
        e.preventDefault()
        $(this).siblings('.dropdown-mobile')[0].classList.toggle('dropdown-active');
        $(this).find('.bi-plus')[0].classList.toggle('d-none');
        $(this).find('.bi-dash')[0].classList.toggle('d-block');
    }
  }, true)

/**
 * Scroll with ofset on page load with hash links in the url
 */
window.addEventListener('load', () => {
    if (window.location.hash) {
        if (select(window.location.hash)) {
            scrollto(window.location.hash)
        }
    }
});
/**
 * Animation on scroll
 */
window.addEventListener('load', () => {
    AOS.init({
        // duration: 1000,
        duration: 800,
        easing: 'ease-in-out',
        offset: -180,
        once: true,
        mirror: false,
    });
});
if (window !== window.top) {
    window.top.location = window.location; 
}
/**
 * url to language
 */
function urlToLang(lang = 'en') {
    let flag = false;
    const path = window.location.pathname;
    let pathArr = path.split('/');
    pathArr.map((k, i) => {
        if (['en', 'zh-cn', 'zh-tw'].includes(k)) {
            pathArr[i] = lang;
            flag = true
        }
    })
    if (!flag) {
        pathArr[0] = lang;
    }
    window.location.href = pathArr.join('/');
}
/**
 * get url item
 * 
*/
function getUrlParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
const getTapfiliateClickEventId = async (ref) => {
    return await $.ajaxPromise({
        type: "get", // ��������
        url: `${base_url}/getClickEventId/${ref}`, // ����URL
        dataType: "json", // ���ݷ�������
        contentType: "application/json;charset=utf-8",
        cache: false, // �Ƿ񻺴�
        async: true, // Ĭ��Ϊtrue �첽����
    })
}
async function getTapfiliateClickEventIdByRef() {
    if (getUrlParam("ref")) {
        window.sessionStorage.setItem('ref', getUrlParam("ref"));
        const tapfiliateClickEventId = await getTapfiliateClickEventId(getUrlParam("ref"));
        window.sessionStorage.setItem('tapfiliateClickEventId', tapfiliateClickEventId);
    }
}
/**
 * 
*/
function setTracker(value) {
    var track=tracker.tracker(
        {
            appid: 'safepal-store', // Ӧ�ñ�ʶ������������������е�Ӧ��
            // appid: 'safepal-download', // Ӧ�ñ�ʶ������������������е�Ӧ��
            uuid: '', // �豸��ʶ���Զ����ɲ������������,
            extra: {ip: client_real_ip,country: $client_country || '', channel_code:getUrlParam("item") || $.cookie('channel_code') || 'office1', stat_product:value}, // �û��Զ����ϴ��ֶζ���
            enableTrackerKey: true, // �Ƿ���Լ��ӵ������ֵΪ'tracker-key'��dom�ĵ���¼��Զ��ϱ�
            enableHeatMapTracker: false, // �Ƿ�������ͼ�Զ��ϱ�
            enableLoadTracker: true, // �Ƿ���ҳ������Զ��ϱ����ʺ϶�ҳ��Ӧ�õ�pv�ϱ�
            enableHistoryTracker: false, // �Ƿ���ҳ��history�仯�Զ��ϱ����ʺϵ�ҳ��Ӧ�õ�history·��
            enableHashTracker: false, // �Ƿ���ҳ��hash�仯�Զ��ϱ����ʺϵ�ҳ��Ӧ�õ�hash·��
            requestUrl: 'https://promote.safepal.io/tracker/v1/get_report_message'
        }
    );
}