// Clean URL handler for GitHub Pages
(function() {
    // If URL ends with .html and we're not on GitHub Pages editor
    if (window.location.pathname.endsWith('.html') && !window.location.hostname.includes('github')) {
        const newPath = window.location.pathname.replace('.html', '');
        window.history.replaceState(null, '', newPath + window.location.search + window.location.hash);
    }
})();