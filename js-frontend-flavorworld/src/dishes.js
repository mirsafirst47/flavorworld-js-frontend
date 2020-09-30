let dishesDiv = document.querySelector("#dish-collection")

let dishDiv = document.createElement('div')



// add comments to a movie
let addComment = function(div, dish){
  let addCommentBtn = document.createElement('button')
  addCommentBtn.innerText = 'Add Comment'

  let deleteCommentBtn= document.createElement('button')
  deleteCommentBtn.innerHTML="Delete Comment"
  let commentDiv = document.querySelector('#comment-section')

  div.append(addCommentBtn, deleteCommentBtn)


  addCommentBtn.addEventListener('click', function(){
    let commentForm= document.createElement('form')
    rootDiv.append(commentForm)
    let inputLabel= document.createElement('label')
    inputLabel.innerText= 'Write your comment here!'
    let commentInput = document.createElement('input')
    let submitCommentBtn = document.createElement('input')
    submitCommentBtn.type = "submit"
    commentForm.append(inputLabel, commentInput, submitCommentBtn)


    commentForm.addEventListener('submit', function(e){

      e.preventDefault()
      let newCommentTag = document.createElement('p')
      newCommentTag.innerText = commentForm[0].value
      commentDiv.append(newCommentTag)


      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify
        ({
          movie_id: film.id,
          likes: 0,
          comment: commentForm[0].value,
          user_id: user.user_id

        })
      })
    })
  })
}

//searchBar
let search = function(){

    let searchDiv = document.createElement('div')
    searchDiv.setAttribute('class','search')
    movieDiv.append(searchDiv)

    let searchLabel= document.createElement('label')
    searchLabel.innerText= 'Search for movies:'
    let searchInput = document.createElement('input')
    searchInput.innerText = "search movies"

    searchDiv.append(searchLabel,searchInput)
    searchInput.addEventListener('keyup',function(e){

        let searchString = e.target.value.toLowerCase()
        fetch('http://localhost:3000/movies')
        .then(function(response){
        return response.json()
        })
    .then(function(mov){
     let filteredMovies = mov.filter((obj) => {
      return(obj.title.toLowerCase().includes(searchString))

      })
      picDiv.innerText = ""
      console.log(filteredMovies)
      movieArr(filteredMovies)
    })

  })

}

search()

//List of movies
let dishList = function(){

    rootDiv.append(dishDiv)
    rootDiv.append(dishesDiv)
    fetch("http://localhost:3000/dishes")
        .then(res => res.json())
        .then((arrayOfDishes) => {

        arrayOfDishes.forEach((dish) => {
            turnDishToHTML(dish)
        })
    })
}

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


// let movieArr = function(movies){
//   movies.forEach(movie =>{

//     let cardDiv = document.createElement('div')
//     cardDiv.setAttribute('class','card col-sm-2');
//     picDiv.setAttribute('class', 'row')
//     let movName = document.createElement('h5')
//       movName.innerText = movie.title

//     let movImg = document.createElement('img')
//       movImg.src = `http://image.tmdb.org/t/p/w185/${movie.image}`
//       movImg.setAttribute('class','movieimage')
//       movImg.style.width = "100%"

//       cardDiv.append(movName,movImg)
//       picDiv.append(cardDiv)

    //click on the card to go to showpage
    cardDiv.addEventListener('click', function(){
      rootDiv.innerText=""
      let divTag = document.createElement('div')
      divTag.setAttribute('id', 'show-panel')
      
//creates the wathclist button and hides it unless the user is logged in 
      let watchListBtn= document.createElement('button')
      watchListBtn.setAttribute("id","watch-list")
      watchListBtn.innerText= "Add To Watchlist"
      // $(watchListBtn).hide()

      let imgTag = document.createElement('img')
      imgTag.style.marginLeft='50%'
      imgTag.style.transform='translateX(-50%)'
      let pTag = document.createElement('p')
      let rating = document.createElement('p')
      let runtime = document.createElement('p')
      let release_date = document.createElement('p')
      let backBtn = document.createElement('button')
    
  
      let like = document.createElement('p')
      let commentSection= document.createElement('div')
      commentSection.setAttribute("id","comment-section")


      let unlike = document.createElement('p')
      imgTag.src = `http://image.tmdb.org/t/p/w185/${movie.image}`
      pTag.innerText = movie.details
      rootDiv.append(imgTag)
      rootDiv.append(divTag)
      divTag.append(pTag)

      rating.innerText = `Rating: ${movie.rating}`
      runtime.innerText = `Runtime: ${movie.runtime} mins`
      release_date.innerText = `Release Date: ${movie.released_date}`
      like.innerText = `likes: ${movie.likes}`
      backBtn.innerText = '<-- Back to All Movies'

      commentSection.innerText= "Comment Section"

      rootDiv.append(divTag)
      divTag.append(pTag, rating, runtime, release_date,like, commentSection)
      if(user!= null){
        divTag.append(watchListBtn)
      }
      
  
      watchListBtn.addEventListener('click', function(){
        rootDiv.innerText=""

        fetch("http://localhost:3000/watchlists", {
          method:"POST",
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            movie_id : movie.id,
            user_id: user.id
          })
        })
        .then(()=>{
        //     // watchList();
        //     rootDiv.innerText="" ;
          


      fetch("http://localhost:3000/watchlists")
      .then(function(r){
        return r.json();
      })
      .then(function(watchlists){
        // let newArr= []
      
        let findDiv= document.querySelector('#root')
   
        watchlists.forEach(watchlist=> singleMovie(watchlist))
        
  })
      
          })

      
         
        })
    
      // invoke addComment Functiono update comment section
      addComment(divTag, movie)

      backBtn.addEventListener('click', function(){
        divTag.remove()

        listMovies()
      })

      // get all comments and create p tags to render
      movie.comments.forEach(function(comment){
        let commentP= document.createElement('p')
        commentP.innerText= comment.comment
        commentSection.append(commentP)
       })


      divTag.append(pTag, rating, runtime, release_date,like)

      backBtn.addEventListener('click', function(){
        rootDiv.innerText=''
        listMovies()
      })

      //like
      let likeBtn = document.createElement('button')
      likeBtn.innerText = "Like"
      likeBtn.addEventListener('click',function(){
          movie.likes += 1
          like.innerText = `likes: ${movie.likes}`
      })

      //unlike
      let unlikeBtn = document.createElement('button')
      unlikeBtn.innerText = "Unlike"
      unlikeBtn.addEventListener('click',function(){
          movie.likes -= 1
          like.innerText = `likes: ${movie.likes}`
      })
      divTag.append(likeBtn,unlikeBtn,backBtn)

    })

})
}


let singleMovie= function(watchlist){
  console.log(watchlist)
 
  let findDiv= document.querySelector('#root')
  

             if(watchlist.user_id== user.id){
              let li= document.createElement('li')
              li.innerText= watchlist.movie.title
               findDiv.append(li)
             }
}