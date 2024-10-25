document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('post-list')) {
        loadPosts(); // Cargar publicaciones
    }

    // Evento para agregar publicación
    const form = document.getElementById('post-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitar el envío del formulario

            const titulo = document.getElementById('post-titulo').value; // Obtener el valor del campo de título
            const contenido = document.getElementById('post-contenido').value; // Obtener el valor del campo de contenido

            const posts = getPosts(); // Recupera las publicaciones existentes
            posts.push({ titulo, contenido }); // Agrega la nueva publicación al arreglo
            localStorage.setItem('posts', JSON.stringify(posts)); // Guarda en localStorage

            form.reset(); // Limpiar el formulario
            loadPosts(); // Cargar publicaciones nuevamente
        });
    }
});

// Cargar publicaciones
function loadPosts() {
    const posts = getPosts();
    const postList = document.getElementById('post-list');
    if (postList) {
        postList.innerHTML = ''; // Limpia la lista
        posts.forEach((post, index) => {
            const postElement = document.createElement('li');
            postElement.innerHTML = `
                <h3>${post.titulo}</h3>
                <p>${post.contenido}</p>
                <button onclick="editPost(${index})">Editar</button>
                <button onclick="deletePost(${index})">Eliminar</button>
            `;
            postList.appendChild(postElement);
        });
    }
}

// Obtener publicaciones
function getPosts() {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

// Editar publicación
function editPost(index) {
    const posts = getPosts();
    const post = posts[index];

    // Rellenar el formulario con los datos existentes
    document.getElementById('post-titulo').value = post.titulo;
    document.getElementById('post-contenido').value = post.contenido;

    // Eliminar la publicación seleccionada después de la edición
    deletePost(index);
}

// Eliminar publicación
function deletePost(index) {
    const posts = getPosts();
    posts.splice(index, 1); // Elimina la publicación del arreglo
    localStorage.setItem('posts', JSON.stringify(posts)); // Actualiza localStorage
    loadPosts(); // Recargar publicaciones
}
