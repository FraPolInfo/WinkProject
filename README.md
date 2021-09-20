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
node index.js
```
Le librerie utilizzate per MondoDB ed Express sono gestite automaticamente da npm dal file *package.json* e non devono essere scaricate separatamente.
## Overwiev 
Questo progetto relizza un servizio basato su api restful. 

Il file *index.js* contiene la configurazione di express per l'ascolto e il routing delle chiamate Http.

Le Api vengono implementate nella classe *routers/api/Router.js*

Le pagine Html offerte sono contenute nella cartella *public*. 
*public/src* contiene il file di Typescript, *public/dist* è la cartella statica che contiene la pagina html che viene mostrata a front-end.

L'applicazione viene offerta su "http://localhost:5000/". La porta 5000 viene sovrascritta dalla variabile port dell'environment utilizzato, come specificato dalla variabile process.env.PORT

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

## Front End
Il front end viene realizzato in Typescript nel file *public/src/index.ts*

Le chiamate vengono gestite dal metodo asincrono fetch() che restituisce una promise contenendo il risultato della chiamata. I metodi utilizzati sono i seguenti;

### getPost()
Ottiene il JSON contenente tutti i post del database e passa il risultato alla funzione *makePostBox(data: jsonPost[])* per la visualizzazione sulla pagina.

### getPostsByHashtag(e: Event)
Funzione lanciata dall'evento 'submit' sul pulsante "Cerca". Effettua una chiamata di ricerca passando a parametro la lista degli Hasthtag passata del form adiacente. 
Gli hashtag vengono divisi indicando uno spazio tra uno e l'altro. Il risultato alla funzione *makePostBox(data: jsonPost[])* per la visualizzazione sulla pagina.

### makePostBox(data: jsonPost[]) 
Crea una lista di oggetti html di classe *Postbox* che contengono ognuno le informazioni di un singolo post, più il tasto per la sua cancellazione. 

### publicPost(e: Event)
Funzione lanciata dall'evento 'submit' sul pulsante "Pubblica". Effettua una chiamata passando a parametro gli elementi del form sovrastante. Ricarica la pagina al completamento della richiesta.

*Attenzione: I post totalmente vuoti sono contemplati e non restituiscono errore, e possono essere cancellati normalmente*

### deletePost(e: Event)
Funzione lanciata all'evento "click" sul pulsante 'X' dei singoli Postbox. Chiama una funzione di delete dell'oggetto dal database, passando l'id del post. Ricarica la pagina al completamento della richiesta.
