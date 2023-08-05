const parentElement=document.querySelector('.main');
const searchBar=document.querySelector('.search-bar');
const imdbSelect=document.querySelector('.imdb-ratings');

let filterMovies=[];
let imdbMovies=[];
let genreMovies=[];
let imdbto="";
const URL='https://movies-app.prakashsakari.repl.co/api/movies';
const moviesApi=async (URL)=>{
    try{
        const {data}= await axios.get(URL);
        return data;
    }
    catch(err){
        console.log(err);
    }
}
let movies= await moviesApi(URL);

const render=(movies)=>{

    for(let movie of movies)
    {
        //main-card
        const card=document.createElement('div');
        card.classList.add('card');
        parentElement.appendChild(card);

        //image container
        const  imageContainer=document.createElement('div');
        imageContainer.classList.add('image-container');
        card.appendChild(imageContainer);

        //image
        const image=document.createElement('img');
        image.classList.add('image');
        image.setAttribute('src',movie.img_link);
        image.setAttribute('alt',movie.name);
        imageContainer.appendChild(image);

        //movie details
        const cardDetails=document.createElement('div');
        cardDetails.classList.add('card-details');
        card.appendChild(cardDetails);

        //movie title
        const title=document.createElement('p');
        title.classList.add('title');
        title.innerText=movie.name;
        cardDetails.appendChild(title);

        //genre
        const genre=document.createElement('p');
        genre.classList.add('genre');
        genre.innerText=`Genre: ${movie.genre}`;
        cardDetails.appendChild(genre);

        //rating
        const rating=document.createElement('div');
        rating.classList.add('ratings');
        cardDetails.appendChild(rating);

        //star-rating
        const starRating=document.createElement('div');
        starRating.classList.add('star-rating');
        rating.appendChild(starRating);

        //material-symbols-outlined star icon
        const materialOutline=document.createElement('span');
        materialOutline.classList.add('material-symbols-outlined');
        materialOutline.innerText='star';
        starRating.appendChild(materialOutline);

        //imdb rating
        const imdb_rating=document.createElement('span');
        imdb_rating.innerText=movie.imdb_rating;
        starRating.appendChild(imdb_rating);

        //duration
        const duration=document.createElement('p');
        duration.innerText=movie.duration+'min';
        rating.appendChild(duration);
    }
}

render(movies);

searchBar.addEventListener('keyup',()=>{
    if(searchBar)
    {
        if(imdbto)
        {
            filterMovies=imdbMovies.filter(movie=>movie.name.toLowerCase().includes(searchBar.value.toLowerCase())||
                                        movie.cast_name.toLowerCase().includes(searchBar.value.toLowerCase())||
                                        movie.director_name.toLowerCase().includes(searchBar.value.toLowerCase()));
            parentElement.innerHTML='';
            render(filterMovies);
        }
        else
        {
            filterMovies=movies.filter(movie=>movie.name.toLowerCase().includes(searchBar.value.toLowerCase())||
                                        movie.cast_name.toLowerCase().includes(searchBar.value.toLowerCase())||
                                        movie.director_name.toLowerCase().includes(searchBar.value.toLowerCase()));
            parentElement.innerHTML='';
            render(filterMovies);
        }
    }else
    {
        parentElement.innerHTML="";
        render(movies);
    }
});

imdbSelect.addEventListener('change',(event)=>{
    imdbto=event.target.value
    if(searchBar.value.length!==0)
    {
        imdbMovies=filterMovies.filter(movie=>movie.imdb_rating>=event.target.value);
        parentElement.innerHTML='';
        render(imdbMovies);
        imdbSelect.value=""
    }
    else
    {
        imdbMovies=movies.filter(movie=>movie.imdb_rating>=event.target.value);
        parentElement.innerHTML='';
        render(imdbMovies);
        imdbSelect.value=""
    }
})
