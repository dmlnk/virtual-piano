const piano = document.querySelector('.piano');
const keys = Array.from(document.querySelectorAll('.piano-key'));

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('piano-key-active');
  }

// keyboard part
function playSound(e) {
    const audio = document.querySelector(`audio[data-letter="${(e.code).slice(-1)}"]`);
    const key = document.querySelector(`div[data-letter="${(e.code).slice(-1)}"]`);
    if (!audio) return;

    key.classList.add('piano-key-active');
    audio.currentTime = 0;
    audio.play();
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    // console.log(e.code);
}
window.addEventListener('keydown', playSound);


// mouse drag part
const startSound = (event) => {
    event.target.classList.add("piano-key-active");
    const audio = document.querySelector(`audio[data-letter="${event.path[0].dataset.letter}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
}

const stopSound = (event) => {
    event.target.classList.remove("piano-key-active");
}

const startCorrespondOver = (event) => {
    if (event.target.classList.contains("piano-key")) {
        event.target.classList.add("piano-key-active");
        startSound(event);
    }
    keys.forEach((elem) => {
        elem.addEventListener("mouseover", startSound);
        elem.addEventListener("mouseout", stopSound);
    })
}


const stopCorrespondOver = () => {
    keys.forEach((elem) => {
        elem.classList.remove("piano-key-active")
        elem.removeEventListener("mouseover", startSound);
        elem.removeEventListener("mouseout", stopSound);
    })
}

piano.addEventListener("mousedown", startCorrespondOver, false);
document.body.addEventListener("mouseup", stopCorrespondOver);

//toggler 
const notes = document.querySelector(".btn-notes")
const letters = document.querySelector(".btn-letters")

const notesPress = (event) => {
    letters.classList.remove("btn-active");
    notes.classList.add("btn-active");
    keys.forEach(key => key.classList.remove("piano-key-letter"));
}

const lettersPress = (event) => {
    notes.classList.remove("btn-active");
    letters.classList.add("btn-active");
    keys.forEach(key => key.classList.add("piano-key-letter"));
}

notes.addEventListener("click", notesPress);
letters.addEventListener("click", lettersPress);

//full screen 
const elem = document.documentElement;
const fsButton = document.querySelector(".fullscreen");

const enterFullScreen = (event) => {
    console.log('kjkdfjkdj');
    if (event.target.classList.contains("openfullscreen")) {
        elem.requestFullscreen();
        event.target.classList.remove("openfullscreen");
    }
    else {
        document.exitFullscreen();
        event.target.classList.add("openfullscreen");
    }
}

fsButton.addEventListener("click", enterFullScreen);
