const rootDiv = document.getElementById('root');

function renderSignUp() {
    rootDiv.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signupForm">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password"><br>
            <button type="button" onclick="handleSignUp()">Sign Up</button>
        </form>
    `;
}

let userName = '';
function handleSignUp() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (nameInput && emailInput && passwordInput) {
        userName = nameInput;
        renderHomePage();
    } else {
        alert('Please fill out all fields');
    }
}

let posts = [];
function renderHomePage() {
    rootDiv.innerHTML = `
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList"></ul>
    `;
    renderPostList();
}

function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent) {
        posts.push(postContent);
        renderPostList();
    } else {
        alert('Post content cannot be empty');
    }
}

function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = '';
    posts.forEach((post, index) => {
        const postItem = document.createElement('li');
        postItem.textContent = post;

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button'; // Add class for styling
        editButton.onclick = () => handleEditPost(index);

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button'; // Add class for styling
        removeButton.onclick = () => handleRemovePost(index);

        postItem.appendChild(editButton);
        postItem.appendChild(removeButton);
        postListElement.appendChild(postItem);
    });
}

function handleEditPost(index) {
    const newContent = prompt('Edit your post:', posts[index]);
    if (newContent !== null) {
        posts[index] = newContent;
        renderPostList();
    }
}

function handleRemovePost(index) {
    posts.splice(index, 1);
    renderPostList();
}

// Initial call to render the sign-up form
renderSignUp();
