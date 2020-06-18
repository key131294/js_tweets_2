//! VARIABLES
// Crearemos variable del div en donde se almacenaran los tweets
const listaTweets = document.getElementById('lista-tweets')
// id del formulario para enviar los tweets
const formulario = document.getElementById('formulario')


//! EVENTLISTENERS
//todo los eventlistener lo haremos en una funcion para que no quede de forma global
eventListeners()
function eventListeners() {
    // aca si iran los addEventListener
    // cuando se ebvia el formulario.
    formulario.addEventListener('submit', agregarTweet);

    //todo Usando Delegation
    // para saber que elemento esta dando click, para que borre del dom los tweets
    listaTweets.addEventListener('click', borrarTweets)

    //todo contenido cargado, carga cuando el index a finalizado de cargarse
    document.addEventListener('DOMContentLoaded', localStorageListo);


}


//! FUNCTIONS
// function para agregar tweets
function agregarTweet(e) {
    e.preventDefault()
    //* leer el valor que contiene el textarea, se hace aca dentro ya que el textarea esta dentro del form, y esta es la function del form
    const tweet = document.getElementById('tweet').value  /* 1 */
    // creando el boton para borrar (enlace)
    const botonBorrar = document.createElement('a')
    // añadendo class al oton
    botonBorrar.classList = 'borrar-tweet';
    // añadiendp contenido al botonBorrar
    botonBorrar.innerText = 'X';
    // despues de leer el valor del textarea, crearemos un elemento en donde se almacenara en el Dom
    const li = document.createElement('li'); /* 2 */
    // añadiendo lo que contendra la lista
    li.innerText = tweet; /* 3 */
    // añade el boton de borrar en listaTeets
    li.appendChild(botonBorrar)
    // llamaremos e insertaremos en donde querramos que nuestra lista creada se añada ( donde, agregando en, variable donde esta el createElement)
    listaTweets.appendChild(li) /* 4 */
    //todo Reseteando el formulario despues de agregar tweets
    e.target.reset()

    //  agregar tweet al localStorage
    agregarTweetLocalStorage(tweet)

}

// function para eliminar de la listaTweet los tweet seleccionado
function borrarTweets(e) {
    e.preventDefault();
    // si no usamos delegation no sabriamos en que lado se da click dentro de la lista del tweet
    // haremos un if para decirle que si dio click en tal sitio que querriamos, entonces se ejecute algo
    if (e.target.className === 'borrar-tweet') {
        // y aca borramos la linea en donde se encuentra el X de borrar
        e.target.parentElement.remove();

        // seria factible que despues de borrar del dom, tmb se borrre del Ls. por eso desde aca llamaremos una function (este es el paso final del video)
        //* oo; para borrar del local storage se tieen que borrar en formato de texto, no como el dom que es por la etiqueta lista, en este proyecto de ejemplo.
        borrarTweetLocalStorage(e.target.parentElement.innerText)
    }
}

//todo AGREGA TWEET AL LOCAL STORAGE
function agregarTweetLocalStorage(tweet) {
    // crearemos una variable la cual servira para qure trabaje y note los cambios que ocurra en el Ls
    let tweeteros;

    tweeteros = obtenerTweetLocalStorage()

    tweeteros.push(tweet);
    // convertir de string a array para el Ls
    localStorage.setItem('tweeteros', JSON.stringify(tweeteros))

}

//todo Obtener Tweet local STORAGE, leer cuantos tweet hay en el Ls
function obtenerTweetLocalStorage() {
    let tweeteros;
    // revisar los valores del ls
    //* Haremos un if para ver si no existe tweet para que devuelva vacio, o caso contrario nos muestre todo los tweets
    if (localStorage.getItem('tweeteros') === null) {
        tweeteros = []
    } else {
        tweeteros = JSON.parse(localStorage.getItem('tweeteros'))
    }
    return tweeteros;
}

// function para el DOMContentloaded, osea cuando el index se cargue o actualice
function localStorageListo() {
    let tweeteros;
    tweeteros = obtenerTweetLocalStorage();
    // imprimiremos usando el forEach
    tweeteros.forEach(function (tweet) {
        // aca le pasamos los elementos creados, para que se visulice lo del Ls en el Dom
        const botonBorrar = document.createElement('a')
        // añadendo class al oton
        botonBorrar.classList = 'borrar-tweet';
        // añadiendp contenido al botonBorrar
        botonBorrar.innerText = 'X';
        // despues de leer el valor del textarea, crearemos un elemento en donde se almacenara en el Dom
        const li = document.createElement('li'); /* 2 */
        // añadiendo lo que contendra la lista
        li.innerText = tweet; /* 3 */
        // añade el boton de borrar en listaTeets
        li.appendChild(botonBorrar)
        // llamaremos e insertaremos en donde querramos que nuestra lista creada se añada ( donde, agregando en, variable donde esta el createElement)
        listaTweets.appendChild(li) /* 4 */
    })
}

//todo Eliminar tweet del Local storage
function borrarTweetLocalStorage(tweet) {
    // lo que haremos es eliminar la X del enlace que nos aparece para eliminar...
    let tweeteros, tweetBorrar; /* sera la version cortada, sin esa X */
    // elimina la X del Tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1)
    // console.log(tweetBorrar);

    tweeteros = obtenerTweetLocalStorage()
    tweeteros.forEach(function (tweet, index) {
        //Reakiazremos un if
        if(tweetBorrar === tweet){
            tweeteros.splice(index, 1)
        }



    })
    localStorage.setItem('tweeteros', JSON.stringify(tweeteros))
}