
const dishesURL = "http://localhost:3000/dishes"

document.addEventListener("DOMContentLoaded", (e) => {
    
    loadDishes();
    handleOtherForms();
    submitForm();

});

function handleOtherForms() {
    const newDishButton = document.getElementById("new-dish-button");

    newDishButton.addEventListener("click", () => {
        const newUserForm = document.getElementById("new-user-form");
        const newCommentForm = document.getElementById("new-comment-form");

        if (newUserForm.classList.contains("show")) {
            newUserForm.classList.remove("show");
        }

        if (newCommentForm.classList.contains("show")) {
            newCommentForm.classList.remove("show");
        }

    });
}

function submitForm() {
    const newDishForm = document.getElementById("new-dish-form")
    newDishForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewDish(e);
        newDishForm.reset();
    })
}

function addNewDish(event) {
    const data = {
        user_id: event.target[0].value,
        comment_id: event.target[1].value,
        content: event.target[2].value,
        image_url: event.target[3].value,
        likes: 0
    }

    fetch(dishesURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        renderDish(json)
    })
    
}


function loadDishes() {
    const dishContainer = document.getElementById("dish-container")
    dishContainer.innerHTML = ""

    fetch(dishesURL)
    .then(res => res.json())
    .then(dishes => dishes.forEach(dish => {
        renderDish(dish);
    }));
}

function renderDish(dish) {
    const dishContainer = document.getElementById("dish-container")

    const dishCard = document.createElement("div")

    dishCard.className = "card"
    dishCard.style = "width: 18rem;"
    dishCard.id = `dish-card-${dish.id}`
    dishCard.innerHTML = `
        <img src="${dish.image_url}" class="card-img-top" alt="${dish.name}">
        <div class="card-body">
            <h5 class="card-title">${dish.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted"> Origin: ${dish.origin}</h6>
            <p class="card-text" style="font-size: 12px; letter-spacing: 1px;">${dish.description}</p>
            <br><br><br><br>
            <div class="card-buttons-container">
                <p id="likes-count-label-${dish.id}">Likes: <span id="likes-count-${dish.id}">${dish.likes}</span></p>
                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    <button type="button" id="likes-button-${dish.id}" class="btn btn-primary">Likes</button>
                    <button type="button" class="btn btn-success" id="picnic-button-${dish.id}">Picnic</button>
                    <button type="button" id="edit-button-${dish.id}" class="btn btn-secondary" data-toggle="modal" data-target="#modal-edit-button">Edit</button>
                    <button type="button" id="delete-button-${dish.id}" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    `

    dishContainer.appendChild(dishCard)

    addLikesButton(dish)
    addDeleteButton(dish, dishCard)
    addPicnicListButton(dish)
    editDishForm(dish)
};

function addPicnicListButton(dish) {
    const picnicListButton = document.getElementById(`picnic-button-${dish.id}`)
    const picnicListCardsContainer = document.getElementById("picnic-list-cards-container")
    
    const newPicnicItem = document.createElement("div")
    newPicnicItem.className = "card"
    newPicnicItem.style.cssText = "width: 18rem; display: inline-block; margin-bottom: 50px;"
    newPicnicItem.innerHTML = `
        <img src="${dish.image_url}" class="card-img-top" alt="${dish.name}">
        <div class="card-body">
            <h5 class="card-title">${dish.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted"> By: ${dish.origin}</h6>
            <p class="card-text" style="font-size: 12px; letter-spacing: 1px;">${dish.description}</p>
            <button type="button" id="remove-button-${dish.id}" class="btn btn-danger">Remove</button>
        </div>
    `

    picnicListButton.addEventListener("click", (e) => {
        const picnicListCounter = document.getElementById("picnic-counter")
        picnicListCounter.innerText = (parseInt(picnicListCounter.innerText) + 1).toString();
        picnicListCardsContainer.appendChild(newPicnicItem)

        const removeButton = document.getElementById(`remove-button-${dish.id}`)
        removeButton.addEventListener("click", (e) => {
            newPicnicItem.remove();
            picnicListCounter.innerText = (parseInt(picnicListCounter.innerText) - 1).toString();
        })
    })
}

function addDeleteButton(dish, dishCard) {
    const deleteButton = document.getElementById(`delete-button-${dish.id}`)
    deleteButton.addEventListener("click", (e) => {
        dishCard.remove()
        fetch(`http://localhost:3000/dishes/${dish.id}`, {
            method: "DELETE"
        })
    })
}

function addLikesButton(dish) {
    const likesButton = document.getElementById(`likes-button-${dish.id}`)
    likesButton.addEventListener("click", (e) => {
        const likeCount = document.getElementById(`likes-count-${dish.id}`)
        const newLikeCount = (parseInt(likeCount.innerText) + 1).toString();
        const likes = document.getElementById(`likes-count-label-${dish.id}`)
        likeCount.innerText = newLikeCount

        fetch(`http://localhost:3000/dishes/${dish.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                likes: newLikeCount
            })
        });
    });
}

function editDishForm(dish) {
    const editButton = document.getElementById(`edit-button-${dish.id}`)
    
    editButton.addEventListener("click", (e) => {
        const modalBody = document.getElementById("modal-body")
        modalBody.innerHTML = ""
        modalBody.innerHTML = `
            <form id="edit-dish-form">
                <div class="form-group">
                    <label for="edit-dish-content-input">Content</label>
                    <textarea type="text" class="form-control" id="edit-dish-content-input">${dish.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-dish-image-input">Image URL</label>
                    <input type="text" class="form-control" id="edit-dish-image-input" value="${dish.image_url}">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="edit-dish-form-submit">Save changes</button>
                </div>
            </form>
        `

        const editForm = document.getElementById("edit-dish-form")
        editForm.addEventListener("submit", (e) => {
            e.preventDefault();
            addEditChanges(e, dish);
            const confirmation = document.createElement("span")
            confirmation.className = "alert alert-success"
            confirmation.style.cssText = "float: right; margin-right: 20px; width: 425px; text-align: center;"

            confirmation.innerText = "Your changes have been updated!"

            editForm.append(confirmation)
        })
    });

}

function addEditChanges(event, dish) {
    const dishCard = document.getElementById(`dish-card-${dish.id}`)
    dishCard.childNodes[1].src = event.target[1].value
    dishCard.childNodes[3].childNodes[5].innerText = event.target[0].value

    const data = {
        description: event.target[0].value,
        image_url: event.target[1].value
    }

    fetch(`http://localhost:3000/dishes/${dish.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    })
}