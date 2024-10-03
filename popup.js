document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language');
    const fontSelect = document.getElementById('fontSelect');
    const saveBtn = document.getElementById('saveBtn');
    const websiteLink = document.getElementById('websiteLink');
    const websiteList = document.getElementById('websiteList');

    const fonts = {
        arabic: ['Readex Pro', 'Amiri', 'Noto Sans Arabic'],
        english: ['Roboto', 'Open Sans', 'Lato'],
    };

    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        loadFonts(selectedLanguage);
    });

    saveBtn.addEventListener('click', () => {
        const selectedFont = fontSelect.value;
        const selectedLanguage = languageSelect.value;
        const link = websiteLink.value;

        saveWebsite(selectedFont, selectedLanguage, link);
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

    function saveWebsite(font, language, link) {
        chrome.storage.sync.get('websites', (data) => {
            const websites = data.websites || {};
            websites[link] = { font, language, enabled: true };
            chrome.storage.sync.set({ websites }, () => {
                console.log('Website saved:', link);
                renderWebsites();
            });
        });
    }

    function removeWebsite(link) {
        chrome.storage.sync.get('websites', (data) => {
            const websites = data.websites || {};
            delete websites[link];
            chrome.storage.sync.set({ websites }, () => {
                console.log('Website removed:', link);
                renderWebsites();
            });
        });
    }

    function toggleWebsite(link, enabled) {
        chrome.storage.sync.get('websites', (data) => {
            const websites = data.websites || {};
            websites[link].enabled = enabled;
            chrome.storage.sync.set({ websites }, () => {
                console.log('Website toggled:', link, enabled);
                renderWebsites();
            });
        });
    }

    function renderWebsites() {
        websiteList.innerHTML = '';
        chrome.storage.sync.get('websites', (data) => {
            const websites = data.websites || {};
            for (const link in websites) {
                const { font, language, enabled } = websites[link];
                const li = document.createElement('li');
                li.innerHTML = `
                    ${link} (${language}, ${font}) -
                    <button class="remove-btn" data-link="${link}">Remove</button>
                    <label>
                        <input type="checkbox" class="enable-checkbox" data-link="${link}" ${enabled ? 'checked' : ''}> Enabled
                    </label>
                `;
                websiteList.appendChild(li);
            }

            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const link = button.dataset.link;
                    removeWebsite(link);
                });
            });

            const enableCheckboxes = document.querySelectorAll('.enable-checkbox');
            enableCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const link = checkbox.dataset.link;
                    toggleWebsite(link, checkbox.checked);
                });
            });
        });
    }

    loadFonts(languageSelect.value);
    renderWebsites();
});