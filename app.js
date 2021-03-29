const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const navContainer = document.getElementById("nav-container");

const navLofi = document.getElementById("nav-lofi");
const navAnime = document.getElementById("nav-anime");
const navThinkful = document.getElementById("nav-thinkful");

const navLofiSongs = document.getElementById("nav-lofi-songs");
const navAnimeSongs = document.getElementById("nav-anime-songs");
const navThinkfulSongs = document.getElementById("nav-thinkful-songs");

const navLofiContainer = document.getElementById("nav-lofi-container");
const navAnimeContainer = document.getElementById("nav-anime-container");
const navThinkfulContainer = document.getElementById("nav-thinkful-container");

const backLofiNav = document.getElementById("back-lofi-nav");
const backAnimeNav = document.getElementById("back-anime-nav");
const backThinkfulNav = document.getElementById("back-thinkful-nav");

// sing titles

const lofiSongs = ["hey", "summer", "ukulele", "sayso"];
const animeSongs = ["hey", "summer", "sayso", "ukulele"];
const thinkfulSongs = ["hey", "sayso", "summer", "ukulele"];
let songs = lofiSongs;

// keep track of song
let songIndex = 2;


// creating elements in DOM by songs array
function createEl(songs, navSongs){
    for(var i = 0; i < songs.length; i++ ) {
        const El = document.createElement("li");
        let textnode = document.createTextNode(songs[i]);
        El.appendChild(textnode);
        navSongs.appendChild(El);
}}

createEl(lofiSongs, navLofiSongs);
createEl(animeSongs, navAnimeSongs);
createEl(thinkfulSongs, navThinkfulSongs);

// checks if any element is in parent
const lofiLinks = navLofiSongs.querySelectorAll("li");
const animeLinks = navAnimeSongs.querySelectorAll("li");
const thinkfulLinks = navThinkfulSongs.querySelectorAll("li");


// take song from nav and plays it
function navPlay(links){
    links.forEach(link => {
        link.addEventListener("click", () =>{
            loadSong(link.innerHTML);
            playSong();
        })
})};

navPlay(lofiLinks);
navPlay(animeLinks);
navPlay(thinkfulLinks);



//initially load song details into DOM
loadSong(animeSongs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
}

// Previous song
function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong(){
    songIndex++;
    
    if(songIndex > songs.length -1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercemt = (currentTime / duration) * 100;
    progress.style.width = `${progressPercemt}%`;

    // song ends and start next
    if(progressPercemt == 100){
        nextSong();
    }
}

// set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


// Event listener
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    // "contains" checks if "play" is in the class (boolean) 

    if(isPlaying) {
        pauseSong();
    }else {
        playSong();
    }
})



// Change song
// prevBtn.addEventListener("click", prevSong.bind(prevBtn.id),false);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);


// adding element to nav
navLofi.addEventListener("click", () =>{
    navLofiContainer.classList.toggle("out");
    songs = lofiSongs;
    console.log(songs);
})

navAnime.addEventListener("click", () =>{
    navAnimeContainer.classList.toggle("out");
    songs = animeSongs;
    console.log(songs);
})

navThinkful.addEventListener("click", () =>{
    navThinkfulContainer.classList.toggle("out");
    songs = thinkfulSongs;
    console.log(songs);
})

backLofiNav.addEventListener("click", () =>{
    navLofiContainer.classList.toggle("out");
})

backAnimeNav.addEventListener("click", () =>{
    navAnimeContainer.classList.toggle("out");
})

backThinkfulNav.addEventListener("click", () =>{
    navThinkfulContainer.classList.toggle("out");
})


