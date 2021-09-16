const postList = document.getElementById("postList");
const postForm = document.getElementById('postForm');
const hashList = document.getElementById('hashFind');
const rechargeBtn = document.getElementById('listBtn');
const AUTHOR = 'Brian Fox';

postList!.addEventListener('click', deletePost);
hashList!.addEventListener('submit', getPostsByHashtag);
postForm!.addEventListener('submit', publicPost);
rechargeBtn!.addEventListener('click', getPosts);

interface jsonPost {
	_id?: string
	title: string 
	body: string 
	hashtags?: string[]
	status: string 
	author: string
}

// Funzione che Restituisce tutti i post
function getPosts() {
	//Fetch per ottenere il json che contiene i dati dei singoli post
	fetch('http://localhost:5000/api/posts/getAllPosts')
	.then( (res) => res.json() )
	.then( (data) => makePostBox(data) )
	}

// Funzione che restiuisce i post contenuti nella ricerca per Hashtags
function getPostsByHashtag(e: Event) {
	e.preventDefault();
	let hashFindBar = document.getElementById('hashFindBar') as HTMLFormElement
	let hashtags = hashFindBar.value.split(' ');

	console.log(JSON.stringify( { hashtags: hashtags } ));

	fetch('http://localhost:5000/api/posts/searchPosts', {
			//Metadati e Header
			method:'POST',
			headers: {
				'Accept':'application.json, text/plain, */*',
				'Content-type':'application/json'
			},
			//Body
			body:JSON.stringify( { hashtags: hashtags } )
		}).then( (res) => res.json() )
	.then( (data) => {
		if(data.length > 0) {
			makePostBox(data);
		} else {
			postList!.innerHTML = `<h1> Pare non ci siano post con questi tag! <br> ${hashtags} </h1>`
		}
	})
}

// Funzione che crea i box html contenenti i post
function makePostBox(data: jsonPost[]) {
		postList!.innerHTML = '';
		data.forEach( (post: jsonPost) => {
			//Creo l'oggetto HTML che contiene i dati di ogni post da mostrare
			let postBox = document.createElement('div');
			postBox.className = 'postBox';
			postBox.style.textAlign = 'center';

			let deleteButton = document.createElement('button');
			deleteButton.id = 'deleteButton';
			deleteButton.className = 'delete';
			deleteButton.innerHTML = 'X';

			let hashtags:string = ''

			if(post.hashtags) {
				post.hashtags!.forEach( (hashtag) => hashtags = hashtags.concat(`${hashtag} `) );
			}

			postBox.innerHTML =  `<h3>${post.title}</h3> 
			<h4>Post di ${post.author}</h4>
			<div>${post.body}</div>
			<div>${hashtags}</div>
			<input class="postId" type="hidden" value="${post._id}">
			<hr>
			`
			postBox!.prepend(deleteButton);

			postList!.appendChild(postBox);
		} )
	}


//Funzione chiamata per pubblicare un post creato
function publicPost(e: Event) {
	e.preventDefault();
	//Creiamo l'oggetto Json che dobbiamo passare

	//Titolo
	let formTitle = document.getElementById('postTitle') as HTMLFormElement
	let postTitle = formTitle.value;

	//Corpo del Post
	let formBody = document.getElementById('postBody') as HTMLFormElement
	let postBody = formBody.value;

	//Lista segli Hastag (Opzionale):
	let formHash = document.getElementById('postHashtags') as HTMLFormElement
	let postHash = formHash.value.replaceAll(' ', '').split(",");

	let post: jsonPost = {
		title: postTitle,
		body: postBody,
		status: 'public',
		author: AUTHOR,
		hashtags: postHash
	}

	fetch('http://localhost:5000/api/posts/addPost', 
		//Json che passiamo alla post:
		{
			//Metadati e Header
			method:'POST',
			headers: {
				'Accept':'application.json, text/plain, */*',
				'Content-type':'application/json'
			},
			//Body
			body:JSON.stringify(post)
		}).then( (res) => res.json() )
		.then( (data) => { 
			if(data.acknowledged == true) {
				console.log(data);
				location.reload();
			}
	});
}

//Funzione chiamata per eliminare un post salvato
function deletePost(e: Event) {
	const target = e.target as HTMLDivElement

	if(target.classList.contains('delete')) {
		if(confirm('Vuoi cancellare questo post?')) {
			let target = e.target as HTMLDivElement

			let div = <HTMLDivElement>target.parentElement;

			let idPost = div.getElementsByClassName('postId')[0] as HTMLInputElement;

			fetch('http://localhost:5000/api/posts/deleteOne',
			{
				//Metadati e Header
				method:'POST',
				headers: {
					'Accept':'application.json, text/plain, */*',
					'Content-type':'application/json'
				},
				//Body
				body:JSON.stringify( { _id: idPost.value })
			}).then( (res) => res.json() )
			.then( 	(data) => {	
					if(data.acknowledged == true) {
						console.log(data);
						location.reload();
					}
				} );
		}
	}
}

getPosts();
