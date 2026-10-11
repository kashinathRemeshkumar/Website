// Mobile nav: keep the current page's link centred in the scrollable nav bar,
// and let a mouse wheel scroll it sideways when it overflows.
(function () {
    var list = document.querySelector('.nav ul');
    if (!list) return;

    function centreCurrent(smooth) {
        var link = list.querySelector('[aria-current="page"]');
        if (!link || list.scrollWidth <= list.clientWidth) return;
        var l = list.getBoundingClientRect();
        var c = link.getBoundingClientRect();
        var delta = (c.left + c.width / 2) - (l.left + l.width / 2);
        list.scrollTo({ left: list.scrollLeft + delta, behavior: smooth ? 'smooth' : 'auto' });
    }

    centreCurrent(false);
    window.addEventListener('load', function () { centreCurrent(false); });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { centreCurrent(false); });
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { centreCurrent(false); }, 120);
    });

    // Vertical wheel / trackpad scrolls the nav sideways (desktop browsers)
    list.addEventListener('wheel', function (e) {
        if (list.scrollWidth <= list.clientWidth) return;
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        var max = list.scrollWidth - list.clientWidth;
        var goingRight = e.deltaY > 0;
        if ((goingRight && list.scrollLeft >= max - 1) || (!goingRight && list.scrollLeft <= 0)) return;
        list.scrollLeft += e.deltaY;
        e.preventDefault();
    }, { passive: false });
})();
