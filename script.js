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
            const imagenInput = document.getElementById('post-imagen'); // Obtener el campo de imagen

            const file = imagenInput.files[0]; // Obtener el archivo de imagen
            const reader = new FileReader(); // Crear un FileReader

            reader.onload = function(event) {
                const imagen = event.target.result; // Obtener la URL de la imagen

                const posts = getPosts(); // Recupera las publicaciones existentes
                posts.push({ titulo, contenido, imagen }); // Agrega la nueva publicación al arreglo
                localStorage.setItem('posts', JSON.stringify(posts)); // Guarda en localStorage

                form.reset(); // Limpiar el formulario
                loadPosts(); // Cargar publicaciones nuevamente
            };

            if (file) {
                reader.readAsDataURL(file); // Leer el archivo como una URL de datos
            }
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
                <img src="${post.imagen}" alt="${post.titulo}" class="motorcycle-image">
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

    // Mostrar la imagen existente
    const imagenInput = document.getElementById('post-imagen');
    imagenInput.setAttribute('data-image', post.imagen);

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


// Cargar publicaciones en la main page
document.addEventListener('DOMContentLoaded', function() {
    loadPosts(); // Cargar publicaciones desde localStorage
});

// Cargar publicaciones
function loadPosts() {
    const posts = getPosts();
    const postList = document.getElementById('post-list');
    if (postList) {
        postList.innerHTML = ''; // Limpia la lista
        posts.forEach((post) => {
            const postElement = document.createElement('li');
            postElement.innerHTML = `
                <h3>${post.titulo}</h3>
                <img src="${post.imagen}" alt="${post.titulo}" class="motorcycle-image">
                <p>${post.contenido}</p>
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
