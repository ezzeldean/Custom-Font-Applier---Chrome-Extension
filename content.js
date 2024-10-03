chrome.storage.sync.get(['websites'], (data) => {
    const currentURL = window.location.href;
    const websites = data.websites || {};

    for (const link in websites) {
        if (currentURL.includes(link) && websites[link].enabled) {
            const { font } = websites[link];
            const fontLink = document.createElement('link');
            fontLink.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);

            document.body.style.fontFamily = `'${font}', sans-serif`;
            const allTextElements = document.querySelectorAll('*');
            allTextElements.forEach(el => {
                el.style.fontFamily = `'${font}', sans-serif`;
            });
            break; // Apply only the first matching website's font
        }
    }
});