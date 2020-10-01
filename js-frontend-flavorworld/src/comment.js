// const commentURL = "http://localhost:3000/comments"

// document.addEventListener("DOMContentLoaded", (e) => {

//     handleNewDishComments();
//     newCommentForm();

//     const newCommentButton = document.getElementById("new-comment-button");

//     newCommentButton.addEventListener("click", () => {
//         const newUserForm = document.getElementById("new-user-form");
//         const newDishForm = document.getElementById("new-dish-form");

//         if (newUserForm.classList.contains("show")) {
//             newUserForm.classList.remove("show");
//         }

//         if (newDishForm.classList.contains("show")) {
//             newDishForm.classList.remove("show");
//         }

//     });

// });

// function newCommentForm() {
//     const commentForm = document.getElementById("new-comment-form")
//     commentForm.addEventListener("submit", (e) => {
//         e.preventDefault();
//         addNewComment(e);
//         commentForm.reset();
//     })
// }

// function addNewComment(event) {

//     const data = {
//         content: event.target.value
//     }

//     fetch(commentURL, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(handleNewDishComments)
//     console.log(data)
//     console.log(event)
// }

// function handleNewDishComments() {
//     const newCommentInput = document.getElementById("new-dish-comment-input")
//     newCommentInput.innerHTML = ""


//     fetch(commentURL)
//     .then(resp => resp.json())
//     .then(comments => comments.forEach(comment => {
//         addComment(comment)
//     }));
// }

// function addComment(comment) {
//     const newCommentInput = document.getElementById('new-dish-comment-input')
//     const commentOption = document.createElement('option')
//     commentOption.value = comment.id
//     commentOption.innerText = comment.content

//     newCommentInput.appendChild(commentOption)
// }