/**
* Funzione per l'utilizzo dell'estensione WAPI per risoluzione problema CORS
* @param {string} url - API Endpoint
* @returns {Object} - Ritorna un oggetto
*/

const wapiFetch = async (url, method = 'GET', body = null) => {
    return new Promise((resolve, reject) => {
        const requestId = new Date().getTime();  // ID univoco per tracciare la risposta

        // Definisci un listener dedicato per gestire la risposta
        const responseHandler = (event) => {
            if (event.origin !== window.origin || !event.data) return;
            if (event.data.action !== 'api-response' || event.data.requestId !== requestId) return;

            // Rimuovi il listener dopo la risposta per evitare memory leaks
            window.removeEventListener('message', responseHandler);

            // Gestisci il risultato della risposta
            if (event.data.success) {
                resolve(event.data.data);  // Risolvi la promise con i dati
            } else {
                reject(new Error(event.data.error || 'Errore sconosciuto nella risposta'));
            }
        };

        // Aggiungi il listener per la risposta
        window.addEventListener('message', responseHandler);

        // Invia la richiesta al content.js
        window.postMessage({
            action: 'request-api',
            url: url,
            requestId: requestId,
            method: method,  // Passa il metodo (GET o POST)
            body: body       // Passa il corpo della richiesta (se esiste)
        }, window.origin);
    });
};


export { wapiFetch };
