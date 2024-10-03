chrome.runtime.onInstalled.addListener(() => {
  console.log('Font Switcher extension installed or updated!');
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.websites) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'refreshFonts',
        websites: changes.websites.newValue
      });
    });
  }
});