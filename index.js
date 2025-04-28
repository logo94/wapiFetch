/**
* Funzione per l'utilizzo dell'estensione WAPI per risoluzione problema CORS
* @param {string} url - API Endpoint
* @returns {Object} - Ritorna un oggetto
*/

const wapiFetch = async (url) => {
    return new Promise((resolve, reject) => {
        const requestId = new Date().getTime();  // ID univoco

        // Definisci un listener dedicato
        const responseHandler = (event) => {
            if (event.origin !== window.origin || !event.data) return;
            if (event.data.action !== 'api-response' || event.data.requestId !== requestId) return;

            // Rimuovi il listener dopo la risposta
            window.removeEventListener('message', responseHandler);

            if (event.data.success) {
                resolve(event.data.data);
            } else {
                reject(new Error(event.data.error || 'Errore sconosciuto nella risposta'));
            }
        };

        window.addEventListener('message', responseHandler);

        // Invia la richiesta
        window.postMessage({
            action: 'request-api',
            url: url,
            requestId: requestId
        }, window.origin);
    });
};

export { wapiFetch };
