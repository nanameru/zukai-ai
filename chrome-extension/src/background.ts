// Background script
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: unknown) => console.error(error));

// Listen for messages to open side panel
chrome.runtime.onMessage.addListener((message: { type: string }, sender: chrome.runtime.MessageSender) => {
    if (message.type === 'OPEN_SIDE_PANEL' && sender.tab?.id) {
        chrome.sidePanel.open({ tabId: sender.tab.id });
    }
});
