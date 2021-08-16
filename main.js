//get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full-screen');

//Build out function

function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // if(video.paused){
    //     video.play();
    // }else{
    //     video.pause();
    // }
}

function updateButton(){
    const icon = this.paused ? '◀' : '❙ ❙';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseInt(this.dataset.skip);
}

function updateProgress(){
const persentage = (video.currentTime / video.duration) * 100;
progressBar.style.flexBasis = `${persentage}%`;

}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function scrub(e){
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    video.play(); //add i don't like pause video with progress bar clicked.
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullScreen.addEventListener('click', () => video.requestFullscreen()); //add fullscreen function