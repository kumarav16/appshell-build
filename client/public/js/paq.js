document.title = localStorage.getItem('productName') === null ? document.location.hostname : localStorage.getItem('productName');

// >>> matomo tracking code snippet
var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
// _paq.push(['setCookieSameSite', 'None']); // track a website within an iframe
window.addEventListener('hashchange', function() {
_paq.push(['setCustomUrl', '/' + window.location.hash.substring(1)]);
_paq.push(['trackPageView']);
});
// <<< matomo tracking code snippet