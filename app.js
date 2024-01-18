console.log('App is running.');

// Event Listener für die Neuinstallation des Service Workers
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('Before Install Prompt Event:', event);
    // Hier können Sie die Installation des Service Workers auslösen
    // z.B., durch Anzeigen einer Schaltfläche, die die Installation initiiert
});

// Event Listener für die Installation des Service Workers
window.addEventListener('appinstalled', (event) => {
    console.log('App Installed Event:', event);
});

// Event Listener für den Lebenszyklus des Service Workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}
