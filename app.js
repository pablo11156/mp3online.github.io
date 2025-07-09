const songs = [
  {
    title: "Moscow Mule",
    artist: "Bad Bunny",
    file: "songs/moscow.mp3",
    image: "imagenes/ar1.png"
  },
  {
    title: "A Tu Merced",
    artist: "Bad Bunny",
    file: "songs/BAD BUNNY - A TU MERCED.mp3",
    image: "imagenes/ar2.png"
  },
  {
    title: "BRUCE WAYNE",
    artist: "EASYKID",
    file: "songs/EASYKID - BRUCE WAYNE.mp3",
    image: "imagenes/ar3.png"
  },
  {
    title: "Llora, Llora",
    artist: "Oscar D'Leon",
    file: "songs/Llora, Llora.mp3",
    image: "imagenes/ar4.png"
  },
  {
    title: "La Isla Bonita",
    artist: "Madonna",
    file: "songs/Madonna - La Isla Bonita.mp3",
    image: "imagenes/ar5.png"
  },
  {
    title: "Hope Of Deliverance",
    artist: "Paul McCartney",
    file: "songs/Paul McCartney - Hope Of Deliverance.mp3",
    image: "imagenes/ar6.png"
  },
  {
    title: "Rock That Body",
    artist: "The Black Eyed Peas",
    file: "songs/The Black Eyed Peas - Rock That Body.mp3",
    image: "imagenes/ar7.png"
  },
  {
    title: "Sailing",
    artist: "Christopher Cross",
    file: "songs/Christopher Cross - Sailing.mp3",
    image: "imagenes/ar8.png"
  },
  {
    title: "La Nave del Olvido",
    artist: "Mon Laferte",
    file: "songs/Mon Laferte - La Nave del Olvido.mp3",
    image: "imagenes/ar9.png"
  }
];

let currentSong = 0;
let isPlaying = false;

const ad = document.getElementById("ad");
const titleEl = document.getElementById("title");
const nameEl = document.getElementById("name");
const artistImg = document.getElementById("artist");
const playPauseIcon = document.getElementById("playPauseIcon");
const start = document.getElementById("start");
const end = document.getElementById("end");
const progress = document.getElementById("progress");
const songSelector = document.getElementById("songSelector");

// Llenar el selector con canciones
songs.forEach((song, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = `${song.artist} - ${song.title}`;
  songSelector.appendChild(option);
});

function loadSong(index) {
  const song = songs[index];
  ad.src = song.file;
  titleEl.textContent = song.title;
  nameEl.textContent = song.artist;
  artistImg.src = song.image;
  songSelector.value = index;
}

function playPause() {
  if (!isPlaying) {
    ad.play().then(() => {
      updatePlayIcon(true);
      artistImg.classList.add("spin");
      isPlaying = true;
    }).catch(err => {
      console.error("Error al reproducir:", err);
    });
  } else {
    ad.pause();
    updatePlayIcon(false);
    artistImg.classList.remove("spin");
    isPlaying = false;
  }
}

function updatePlayIcon(playing) {
  if (playing) {
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  } else {
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  }
}

function forward() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  if (isPlaying) {
    ad.play();
    artistImg.classList.add("spin");
    updatePlayIcon(true);
  }
}

function backward() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  if (isPlaying) {
    ad.play();
    artistImg.classList.add("spin");
    updatePlayIcon(true);
  }
}

function selectSong(index) {
  currentSong = parseInt(index);
  loadSong(currentSong);
  if (isPlaying) {
    ad.play();
    artistImg.classList.add("spin");
    updatePlayIcon(true);
  }
}

ad.addEventListener("loadedmetadata", () => {
  end.innerText = formatTime(Math.floor(ad.duration));
});

ad.addEventListener("timeupdate", () => {
  start.innerText = formatTime(Math.floor(ad.currentTime));
  let percent = (ad.currentTime / ad.duration) * 100;
  progress.style.width = percent + "%";
});

ad.addEventListener("ended", () => {
  forward();
});

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  ad.currentTime = (clickX / width) * ad.duration;
}

function formatTime(sec) {
  const min = Math.floor(sec / 60);
  let secs = sec % 60;
  if (secs < 10) secs = "0" + secs;
  return `${min}:${secs}`;
}

// Inicializa
loadSong(currentSong);


