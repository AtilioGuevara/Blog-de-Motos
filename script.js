const postForm = document.getElementById('post-form');
const postList = document.getElementById('post-list');

document.addEventListener('DOMContentLoaded', loadPosts);

postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const post = {
        title,
        content
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
            <h3>${post.title}</h3>
            <p>${post.content}</p>
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
