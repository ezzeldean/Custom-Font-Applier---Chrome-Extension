document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language');
    const fontSelect = document.getElementById('fontSelect');
    const saveBtn = document.getElementById('saveBtn');
    const websiteLink = document.getElementById('websiteLink');

    const fonts = {
        arabic: ['Readex Pro', 'Amiri', 'Noto Sans Arabic'],
        english: ['Roboto', 'Open Sans', 'Lato'],
        // Add more languages and fonts as needed
    };

    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        loadFonts(selectedLanguage);
    });

    saveBtn.addEventListener('click', () => {
        const selectedFont = fontSelect.value;
        const selectedLanguage = languageSelect.value;
        const link = websiteLink.value;

        // Save the font, language, and website link to Chrome storage
        chrome.storage.sync.set({ selectedFont, selectedLanguage, link }, () => {
            console.log('Font, language, and link saved:', selectedFont, selectedLanguage, link);
            alert('Settings saved successfully!');
        });
    });

    function loadFonts(language) {
        fontSelect.innerHTML = '';
        fonts[language].forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            fontSelect.appendChild(option);
        });
    }

    // Load fonts for the default selected language
    loadFonts(languageSelect.value);
});
