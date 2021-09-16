"use strict";
var postList = document.getElementById("postList");
var postForm = document.getElementById('postForm');
var hashList = document.getElementById('hashFind');
var rechargeBtn = document.getElementById('listBtn');
var AUTHOR = 'Brian Fox';
postList.addEventListener('click', deletePost);
hashList.addEventListener('submit', getPostsByHashtag);
postForm.addEventListener('submit', publicPost);
rechargeBtn.addEventListener('click', getPosts);
// Funzione che Restituisce tutti i post
function getPosts() {
    //Fetch per ottenere il json che contiene i dati dei singoli post
    fetch('http://localhost:5000/api/posts/getAllPosts')
        .then(function (res) { return res.json(); })
        .then(function (data) { return makePostBox(data); });
}
// Funzione che restiuisce i post contenuti nella ricerca per Hashtags
function getPostsByHashtag(e) {
    e.preventDefault();
    var hashFindBar = document.getElementById('hashFindBar');
    var hashtags = hashFindBar.value.split(' ');
    console.log(JSON.stringify({ hashtags: hashtags }));
    fetch('http://localhost:5000/api/posts/searchPosts', {
        //Metadati e Header
        method: 'POST',
        headers: {
            'Accept': 'application.json, text/plain, */*',
            'Content-type': 'application/json'
        },
        //Body
        body: JSON.stringify({ hashtags: hashtags })
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        if (data.length > 0) {
            makePostBox(data);
        }
        else {
            postList.innerHTML = "<h1> Pare non ci siano post con questi tag! <br> " + hashtags + " </h1>";
        }
    });
}
// Funzione che crea i box html contenenti i post
function makePostBox(data) {
    postList.innerHTML = '';
    data.forEach(function (post) {
        //Creo l'oggetto HTML che contiene i dati di ogni post da mostrare
        var postBox = document.createElement('div');
        postBox.className = 'postBox';
        postBox.style.textAlign = 'center';
        var deleteButton = document.createElement('button');
        deleteButton.id = 'deleteButton';
        deleteButton.className = 'delete';
        deleteButton.innerHTML = 'X';
        var hashtags = '';
        if (post.hashtags) {
            post.hashtags.forEach(function (hashtag) { return hashtags = hashtags.concat(hashtag + " "); });
        }
        postBox.innerHTML = "<h3>" + post.title + "</h3> \n\t\t\t<h4>Post di " + post.author + "</h4>\n\t\t\t<div>" + post.body + "</div>\n\t\t\t<div>" + hashtags + "</div>\n\t\t\t<input class=\"postId\" type=\"hidden\" value=\"" + post._id + "\">\n\t\t\t<hr>\n\t\t\t";
        postBox.prepend(deleteButton);
        postList.appendChild(postBox);
    });
}
//Funzione chiamata per pubblicare un post creato
function publicPost(e) {
    e.preventDefault();
    //Creiamo l'oggetto Json che dobbiamo passare
    //Titolo
    var formTitle = document.getElementById('postTitle');
    var postTitle = formTitle.value;
    //Corpo del Post
    var formBody = document.getElementById('postBody');
    var postBody = formBody.value;
    //Lista segli Hastag (Opzionale):
    var formHash = document.getElementById('postHashtags');
    var postHash = formHash.value.replaceAll(' ', '').split(",");
    var post = {
        title: postTitle,
        body: postBody,
        status: 'public',
        author: AUTHOR,
        hashtags: postHash
    };
    fetch('http://localhost:5000/api/posts/addPost', 
    //Json che passiamo alla post:
    {
        //Metadati e Header
        method: 'POST',
        headers: {
            'Accept': 'application.json, text/plain, */*',
            'Content-type': 'application/json'
        },
        //Body
        body: JSON.stringify(post)
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        if (data.acknowledged == true) {
            console.log(data);
            location.reload();
        }
    });
}
//Funzione chiamata per eliminare un post salvato
function deletePost(e) {
    var target = e.target;
    if (target.classList.contains('delete')) {
        if (confirm('Vuoi cancellare questo post?')) {
            var target_1 = e.target;
            var div = target_1.parentElement;
            var idPost = div.getElementsByClassName('postId')[0];
            fetch('http://localhost:5000/api/posts/deleteOne', {
                //Metadati e Header
                method: 'POST',
                headers: {
                    'Accept': 'application.json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                //Body
                body: JSON.stringify({ _id: idPost.value })
            }).then(function (res) { return res.json(); })
                .then(function (data) {
                if (data.acknowledged == true) {
                    console.log(data);
                    location.reload();
                }
            });
        }
    }
}
getPosts();
