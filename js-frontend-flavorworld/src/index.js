
let addDish = false;
const dishCollectionDiv = document.querySelector("#dish-collection")
const dishForm = document.querySelector(".add-dish-form")

fetch("http://localhost:3000/dishes")
.then(res => res.json())
.then((arrayOfDishes) => {

    arrayOfDishes.forEach((dish) => {
        turnDishToHTML(dish)
    })
})

// {} -> <li></li>
let turnDishToHTML = (dish) => {
    let dishCardDiv = document.createElement("div")
    dishCardDiv.classList.add("card")

    let dishNameH2 = document.createElement("h2")
    dishNameH2.innerText = dish.name

    let dishImg = document.createElement("img")
    dishImg.src = dish.image_url
    dishImg.alt = dish.name
    dishImg.classList.add("dish-avatar")

    let dishOrigin = document.createElement("p")
    dishOrigin.innerText = `Origin: ${dish.origin}`

    let dishDescription = document.createElement("p")
    dishDescription.innerText = `Description: ${dish.description}`

    let dishLikes = document.createElement("p")
    dishLikes.innerText = `${dish.likes} Likes`

    let likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.innerText = "Like <3"

    let commentButton = document.createElement("button")
    commentButton.classList.add("comment-btn")
    commentButton.innerText = "Comment"

    dishCardDiv.append(dishNameH2, dishImg, dishOrigin, dishDescription, dishLikes, likeButton, commentButton)
    dishCollectionDiv.append(dishCardDiv)

    dishImg.addEventListener("click", (evt) => {
        let dishPage = dish.id
        fetch(`http:/localhost:3000/dishes/${dish.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        })
        .then(res => res.json())
        .then((UpdatedDish) => {
            (UpdatedDish)
        })
    })

    likeButton.addEventListener("click", (evt) => {
    let theNewLikes = dish.likes + 1
    
    fetch(`http:/localhost:3000/dishes/${dish.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            likes: theNewLikes
        })
    })
        .then(res => res.json())
        .then((updatedDish) => {
            dishLikes.innerText = `${updatedDish.likes} Likes`
            dish.likes = updatedDish.likes
        })
    })
}
