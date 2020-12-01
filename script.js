// Player
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');

// Progress Bar
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Controls
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Music Songs
const songs = [
  {
    name: 'song-1',
    displayName: 'Inner Peace',
    artist: 'Mike Chino',
  },
  {
    name: 'song-2',
    displayName: 'Last Summer',
    artist: 'Ikson',
  },
  {
    name: 'song-3',
    displayName: 'Swing',
    artist: 'Peyruis',
  },
  {
    name: 'song-4',
    displayName: 'Wonderland',
    artist: 'Scandinavianz',
  },
];

let isPlaying = false;
let songIndex = 0;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

function nextSong() {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

function updateProgressBar(ev) {
  if (isPlaying) {
    const { duration, currentTime } = ev.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(ev) {
  const width = this.clientWidth;
  const clickX = ev.offsetX;
  const { duration } = music;
  const selectedTime = (clickX / width) * duration;
  music.currentTime = selectedTime;
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
progressContainer.addEventListener('click', setProgressBar);
