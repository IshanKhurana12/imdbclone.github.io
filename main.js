
var favouriteButton=document.getElementById('favour');

var image1=document.getElementById('image1');

var search=document.getElementById("search-button");

var searchList=document.getElementById("container");

var favTemp=document.getElementById(favTemp);

var single=document.getElementById('single-movie-container');
 
var car=document.getElementById('carousel');



async function load(searchTerm){
    const URL=`https://omdbapi.com/?s=${searchTerm}&apikey=e0affcac`;
    const res=await fetch(`${URL}`);
    const data=await res.json();
    console.log(data.Search);
    console.log(data.Response);
    if(data.Response === 'True') 
    {
        displayMovieList(data.Search);
    }
}


function findMovies(){
    let searchTerm=(search.value).trim();
    console.log(searchTerm);
    if(searchTerm.length>0){
    load(searchTerm);
    }
}

let favarr=[];
function displayMovieList(movies){

    searchList.innerHTML="";
    for(let idx=0;idx<movies.length;idx++){
        let movieListItem=document.createElement('div');
        movieListItem.dataset.id=movies[idx].imdbID;


        //search list item
movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A"){
            moviePoster=movies[idx].Poster;
        }
        else{
            moviePoster="imagenotfound.jpg";
        }

            movieListItem.innerHTML=`
            
        <div id="image-container">
        <img src="${moviePoster}">
        <div id="info">
            <h3 id="title">${movies[idx].Title}</h3>
             <p>${movies[idx].Year}</p>
            
       
        </div>   
        </div>
        
        

            `;
            
            searchList.appendChild(movieListItem);  

                

    }
    searchList.style.display="flex";
    favTemp.innerHTML="";
    loadMovieDetails();
}   


//see the  fav arr on click
//save in local storage


// save in loacal storage using localstorage api 




//saving in local storage using array as the key and json arr as the value 


//getting json string from the local storage



//hmmmmmm

function loadMovieDetails(){

    searchList.style.display="flex";
  const searchListMovies=searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie=>{
        
        movie.addEventListener('click',async()=>{
                
                const result=await fetch(`https://omdbapi.com/?i=${movie.dataset.id}&apikey=e0affcac`);
                const movieDetails=await result.json();
               
                searchList.innerHTML="";
                search.value="";
             favTemp.innerHTML="";
                displayMovieDetails(movieDetails);
        });
    });
}

var resultGrid=document.getElementById('single-movie-container');

function displayMovieDetails(details){
    resultGrid.style.display="flex";
   console.log(details);
    resultGrid.innerHTML=`
    <div class = "movie-poster">
    <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
</div>
<button id="favourite">Add To favourites</button>
<div class = "movie-info">
    <h3 class = "movie-title">${details.Title}</h3>
    <ul class = "movie-misc-info">
        <li class = "year">Year: ${details.Year}</li>
        <li class = "rated">Ratings: ${details.Rated}</li>
        <li class = "released">Released: ${details.Released}</li>
    </ul>
    <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
    <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
    <p class = "actors"><b>Actors: </b>${details.Actors}</p>
    <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
    <p class = "language"><b>Language:</b> ${details.Language}</p>
    <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
  
</div>
    `;
    document.getElementById('favourite').onclick=function addtofavv(){
        alert("added to favourites");
        favarr.push(details.Title);
        var d=details.Title;

        window.sessionStorage.setItem(d,d);
    }



    

}





//now i will add the on click functionalotyto my favourite button
 // converting the  json string to relevent obj

favouriteButton.addEventListener('click',function(){
    resultGrid.style.display='none';
    favTemp.style.display='flex';
    searchList.style.display="none";
    var storedArray=[];
    for(let i=0;i<sessionStorage.length;i++){
        const key=sessionStorage.key(i);
        storedArray.push(key);
    }
 
    
         loadfav(storedArray);
});



var favTemp=document.getElementById('favTemp');

async function loadfav(arr){
    console.log(arr);
    for(var i=0;i<arr.length;i++){
    const URL=`https://omdbapi.com/?t=${arr[i]}&apikey=e0affcac`;
    const res=await fetch(`${URL}`);
    const data=await res.json();
let favTempList=document.createElement('div');
    if(data.Response === 'True') 
    {
       favTempList.innerHTML=`
       <div id="final">
       <img src="${(data.Poster!="N/A") ? data.Poster : imagenotfound.jpg}" alt="">
       <h1>${data.Title}</h1>
       <h1>${data.Rated}</h1>
       <h1>${data.Released}</h1>
       <button type="button" id="removed"  value="${data.Title}"> remove from favourites</button>
</div>    
       `;
    }
   
//delete functionality
    favTemp.appendChild(favTempList);
    var btn=document.getElementById("removed");
    var istrue=false;
    console.log(btn.value);
    document.getElementById('removed').onclick=function remove(){
        istrue=true;
        alert("Removed from favourites");
        sessionStorage.removeItem(btn.value);
       if(sessionStorage.length==0){
        favTempList.innerHTML="";
       }
       //reload to update the session storage
       location.reload();
      
    }
}
}


//corousal search

let elements = document.querySelectorAll('#lists');


elements.forEach((item) => {
    item.addEventListener('click', function(){
     search.value=item.ariaPlaceholder;
     findMovies(search.value)
          console.log(item.ariaPlaceholder); 
    });
});


















