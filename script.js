const postForm = document.getElementById('post-form');
const postList = document.getElementById('post-list');

document.addEventListener('DOMContentLoaded', loadPosts);

postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;

    const post = {
        titulo,
        contenido
    };

    savePost(post);

    postForm.reset();

    loadPosts();
});

function savePost(post) {
    let posts = getPosts();
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function getPosts() {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

function loadPosts() {
    const posts = getPosts();
    postList.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('li');
        postElement.innerHTML = `
            <h3>${post.titulo}</h3>
            <p>${post.contenido}</p>
            <button onclick="deletePost(${index})">Eliminar</button>
        `;
        postList.appendChild(postElement);
    });
}

function deletePost(index) {
    let posts = getPosts();
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('post-list')) {
        loadPosts();
    }
});

function loadPosts() {
    const posts = getPosts();
    const postList = document.getElementById('post-list');
    if (postList) {
        postList.innerHTML = '';
        posts.forEach((post, index) => {
            const postElement = document.createElement('li');
            postElement.innerHTML = `
                <h3>${post.titulo}</h3>
                <p>${post.contenido}</p>
            `;
            postList.appendChild(postElement);
        });
    }
}

function getPosts() {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

