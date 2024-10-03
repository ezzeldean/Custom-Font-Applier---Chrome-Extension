chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'refreshFonts') {
    applyFonts(request.websites);
  }
});

function applyFonts(websites) {
  const currentURL = window.location.href;
  for (const link in websites) {
    if (currentURL.includes(link)) {
      const {
        font,
        enabled
      } = websites[link];

      // Remove existing font link if it exists
      const existingFontLink = document.querySelector(`link[href*="${font.replace(/ /g, '+')}"]`);
      if (existingFontLink) {
        existingFontLink.remove();
      }

      if (enabled) {
        const fontLink = document.createElement('link');
        fontLink.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        document.body.style.fontFamily = `'${font}', sans-serif`;
        const allTextElements = document.querySelectorAll('*');
        allTextElements.forEach(el => {
          el.style.fontFamily = `'${font}', sans-serif`;
        });
      } else {
        // Reset font family to default when disabled
        document.body.style.fontFamily = '';
        const allTextElements = document.querySelectorAll('*');
        allTextElements.forEach(el => {
          el.style.fontFamily = '';
        });
      }
      break;
    }
  }
}