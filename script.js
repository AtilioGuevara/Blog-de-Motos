// Obtener elementos del DOM
const postForm = document.getElementById('post-form');
const postList = document.getElementById('post-list');

// Cargar publicaciones almacenadas en LocalStorage
document.addEventListener('DOMContentLoaded', loadPosts);

// Evento para agregar nueva publicación
postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Crear un objeto de nueva publicación
    const post = {
        title,
        content
    };

    // Guardar publicación en LocalStorage
    savePost(post);

    // Limpiar formulario
    postForm.reset();

    // Volver a cargar las publicaciones
    loadPosts();
});

// Función para guardar una publicación en LocalStorage
function savePost(post) {
    let posts = getPosts();
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Función para obtener publicaciones de LocalStorage
function getPosts() {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

// Función para cargar publicaciones en la lista
function loadPosts() {
    const posts = getPosts();
    postList.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('li');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="deletePost(${index})">Eliminar</button>
        `;
        postList.appendChild(postElement);
    });
}

// Función para eliminar una publicación
function deletePost(index) {
    let posts = getPosts();
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}
