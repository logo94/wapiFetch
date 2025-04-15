# wapiFetch
Funzione per l'utilizzo dell'estensione WAPI come proxy per chiamate ad API esterne


## Importazione


### CDN

jsDelivr serve automaticamente i file GitHub con il tipo MIME `application/javascript`, l'URL segue il formato `https://cdn.jsdelivr.net/gh/<user>/<repo>@<branch>/<file>`

```
import { wapiFetch } from 'https://cdn.jsdelivr.net/gh/logo94/wapiFetch@main/index.js';
```

> Pro: aggiornamento automatico; Contro: pagina carica più lentamente 

### Download locale

Il file può essere scaricato localmente e caricato insieme agli altri file JavaScript
```
import { wapiFetch } from './js/wapiFetch.js';
```

> Pro: più veloce; Contro: aggiornamento manuale 


## Esempi

```
<script type="module">
        
 import { wapiFetch } from 'https://cdn.jsdelivr.net/gh/logo94/wapiFetch@main/index.js';

 (async () => {
     const response = await wapiFetch("https://www.wikidata.org/w/api.php?action=query&meta=userinfo&format=json");
     const data = response.json()
 })();

</script>
```
```
<script type="module">
        
  import { wapiFetch } from './js/wapiFetch.js';

  (async () => {
     const response = await wapiFetch("https://www.wikidata.org/w/api.php?action=query&meta=userinfo&format=json");
     const data = response.json()
  })();

</script>
```

