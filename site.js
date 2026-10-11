// Light/dark theme toggle. The saved choice is applied before first paint by
// the tiny inline script in each page's <head>; this handles the button.
(function () {
    var root = document.documentElement;
    var button = document.querySelector('.theme-toggle');
    if (!button) return;

    button.addEventListener('click', function () {
        var current = root.dataset.theme ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        var next = current === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    });
})();
