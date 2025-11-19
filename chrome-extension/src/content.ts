// Content script
console.log("Zukai AI Content Script Loaded");

let floatingButton: HTMLElement | null = null;

function createFloatingButton(x: number, y: number) {
    // Remove existing button
    if (floatingButton) {
        floatingButton.remove();
    }

    // Create button
    floatingButton = document.createElement('div');
    floatingButton.id = 'zukai-ai-button';
    floatingButton.innerHTML = '✨';
    floatingButton.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 999999;
    transition: transform 0.2s;
  `;

    floatingButton.addEventListener('mouseenter', () => {
        if (floatingButton) {
            floatingButton.style.transform = 'scale(1.1)';
        }
    });

    floatingButton.addEventListener('mouseleave', () => {
        if (floatingButton) {
            floatingButton.style.transform = 'scale(1)';
        }
    });

    floatingButton.addEventListener('click', () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            // Open side panel and send selected text
            chrome.runtime.sendMessage({
                type: 'TEXT_SELECTED',
                text: selection.toString()
            });

            // Open side panel
            chrome.runtime.sendMessage({ type: 'OPEN_SIDE_PANEL' });
        }

        if (floatingButton) {
            floatingButton.remove();
            floatingButton = null;
        }
    });

    document.body.appendChild(floatingButton);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (floatingButton) {
            floatingButton.remove();
            floatingButton = null;
        }
    }, 5000);
}

document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 10) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        createFloatingButton(
            rect.left + window.scrollX + rect.width / 2 - 20,
            rect.top + window.scrollY - 50
        );
    } else {
        // Remove button if selection is cleared
        if (floatingButton) {
            floatingButton.remove();
            floatingButton = null;
        }
    }
});
