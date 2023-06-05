let contextMenuItem = {
    id: 'frontdoor-labs',
    title: 'Summarize using Frontdoor Labs' /* what appears in the menu */,
    contexts: [
        'selection',
    ] /* to make this appear only when user selects something on page */,
};

chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create(contextMenuItem);
});

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId === 'frontdoor-labs') {
        chrome.tabs &&
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                (tabs) => {
                    chrome.tabs.sendMessage(
                        tabs[0].id || 0,
                        {
                            type: 'GET_SUMMARY',
                            tab: tabs[0],
                        },
                        (response) => {
                            console.log(response);
                        }
                    );
                }
            );
    }
});
