chrome.storage.sync.get(['selectedFont', 'selectedLanguage', 'link'], (data) => {
    const currentURL = window.location.href;

    // Check if the current URL matches the stored link
    if (currentURL.includes(data.link) && data.selectedFont) {
        const fontLink = document.createElement('link');
        fontLink.href = `https://fonts.googleapis.com/css2?family=${data.selectedFont.replace(/ /g, '+')}&display=swap`;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        // Apply the font to the body
        document.body.style.fontFamily = `'${data.selectedFont}', sans-serif`;
        
        // Optional: Apply font to all text elements
        const allTextElements = document.querySelectorAll('*');
        allTextElements.forEach(el => {
            el.style.fontFamily = `'${data.selectedFont}', sans-serif`;
        });
    } else {
        console.warn('Font not applied: Either the URL does not match or no font is selected.');
    }
});
