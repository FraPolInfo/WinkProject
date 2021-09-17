# WinkProject
## Come far partire il programma
Per far funzionare il programma è necessario disporre dell'environment e del suo package manager, npm (Node Package Sistem).

Npm è compreso nell'ambiente disponibile in Donwload qui [https://nodejs.org/it/](https://nodejs.org/it/)

Una volta installato node è necessario installare typescript attraverso il comando
```
npm install -g typescript
```
Una volta installato è sufficiente raggiungere la cartella in cui è stato clonato il progetto e lanciare il comando
```
Npm run dev
```
## Overwiev 
Questo progetto relizza un servizio di backend basato su api restful. 

Il file *index.js* contiene la configurazione di express per l'ascolto e il routing delle chiamate Http.

Le Api vengono implementate nella classe *routers/api/Router.js*

Le pagine Html offerte sono contenute nella cartella *public*. 
*public/src* contiene il file di Typescript, *public/dist* è la cartella statica che contiene la pagina html che viene mostrata a front-end.
## Back End
Per la realizzazione del backend è stato utilizzato Node.js e il framework Express, insieme al database noSql MongoDb per la realizazione dello strato di persistenza.

Le **API REST** offerte sono implementate nella classe *routers/api/Router.js*

I dati di connessione al database sono descritti all'inizio della classe. Le CRUD vengono implementate attraverso i seguenti medoti:

### router.get('/getAllPosts', function)
La funzione passata a questa route restituisce un JSON contenente tutti post salvati sul Database, ordinati dal più recente al più vecchio. Le chiamate al database essendo asincrone sono precedute da un await per garantire che vengano svolte in sequenza.

### router.post('/searchPosts', function)
La funzione restituisce un JSON contenente gli elementi del Database che contengono tutti gli hashtags passati come body della chiamata.

### router.post('/addPost', function)
Aggiunge un elemento al database contenuto del body della chiamata passata

### router.post('/deleteOne', function)
Elimina un elemento dal database di id corrispondente a quello passato nel body della chiamata.
( Lo stesso risultato poteva essere ottenuto con una chiamata .delete invece di .post, ma ho mantenuto la post per utilizzare lo stesso tipo di chiamate e lasciare all'implementazione la cancellazione)


