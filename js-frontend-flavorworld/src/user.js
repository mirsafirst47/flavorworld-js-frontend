const userURL = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", (e) => {

    handleNewDishUsers();
    newUserForm();

    const newUserButton = document.getElementById("new-user-button");

    newUserButton.addEventListener("click", () => {
        const newCommentForm = document.getElementById("new-comment-form");
        const newDishForm = document.getElementById("new-dish-form");

        if (newCommentForm.classList.contains("show")) {
            newCommentForm.classList.remove("show");
        }
        if (newDishForm.classList.contains("show")) {
            newDishForm.classList.remove("show");
        }

    });

});

function newUserForm() {
    const userForm = document.getElementById("new-user-form")
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewUser(e);
        userForm.reset();
    })
}

function addNewUser(event) {

    const data = {
        username: event.target.value,
        
    }

    fetch(userURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(handleNewDishUsers)
}

function handleNewDishUsers() {
    const newUserInput = document.getElementById("new-dish-user-input")
    newUserInput.innerHTML = ""

    fetch(userURL)
    .then(res => res.json())
    .then(users => users.forEach(user => {
        addUser(user)
    }));
};

function addUser(user) {
    const newUserInput = document.getElementById("new-dish-user-input")
    const userOption = document.createElement("option")
    userOption.value = user.id
    userOption.innerText = user.username

    newUserInput.appendChild(userOption)
}