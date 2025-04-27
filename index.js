/**
* Funzione per l'utilizzo dell'estensione WAPI per risoluzione problema CORS
* @param {string} url - API Endpoint
* @returns {Object} - Ritorna un oggetto
*/

const wapiFetch = async ( url ) => {
        return new Promise((resolve, reject) => {
            const requestId = new Date().getTime();  // Crea un ID univoco per tracciare la risposta
        
            // Invia il messaggio alla pagina per richiedere l'API tramite content.js
            window.postMessage({
                action: 'request-api',
                url: url,
                requestId: requestId
            }, window.origin);
        
            // Ascolta la risposta dal content.js
            window.addEventListener('message', function(event) {
                // Verifica che la risposta sia corretta (stessa origine, azione corretta, ID corretto)
                if (event.origin !== window.origin || !event.data || event.data.action !== 'api-response' || event.data.requestId !== requestId) {
                    return; // Ignora risposte non correlate
                }
        
                // Gestisci la risposta (successo o errore)
                if (event.data.success) {
                    resolve(event.data.data);  // Risolvi la promise con i dati JSON
                } else {
                    reject(new Error(event.data.error));  // Rifiuta la promise con l'errore
                }
            });
        });
}

export { wapiFetch };
