var audioList = document.querySelectorAll(".audio-file"); // Grab all audio elements
var playButtonList = document.querySelectorAll(".play-button"); //Grab all play buttons
var sliderList = document.querySelectorAll(".slider"); // Grab all sliders
var images = []; // Don't need to use this, it is just for pre-loading images
let noUiSlider = require('nouislider');

// Preloads images
function preloadImages() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preloadImages.arguments[i];
    }
}

//-----------------------Button stuff----------------------------

function enablePlayButtons(playButtonList) {
    //console.log("Play button list: " + playButtonList);
    for (var i = 0; i < playButtonList.length; i++) {
        playButtonList[i].addEventListener("click", playPause, false);
    }

}

function enablePauseButtons(pauseButtonList) {
    //console.log("Pause button list: " + pauseButtonList);
    for (var i = 0; i < pauseButtonList.length; i++) {
        pauseButtonList[i].addEventListener("click", pause, false);
    }
}

function playPause() {
    var audio = this.parentNode.getElementsByClassName("audio-file")[0];
    var button = this.parentNode.getElementsByClassName("play-button")[0];

    if (audio.paused) {
        audio.play();
        button.childNodes[0].nextSibling.classList.remove('fa-play')
        button.childNodes[0].nextSibling.classList.add('fa-pause')
        button.childNodes[3].nextSibling.classList.remove('fa-play')
        button.childNodes[3].nextSibling.classList.add('fa-pause')
    } else {
        console.log('pausing')
        audio.pause();
        button.childNodes[0].nextSibling.classList.remove('fa-pause')
        button.childNodes[0].nextSibling.classList.add('fa-play')
        button.childNodes[3].nextSibling.classList.remove('fa-pause')
        button.childNodes[3].nextSibling.classList.add('fa-play')
    }

}


//----------------------------------------------------------

function enableSliders(sliderList) {
    for (var i = 0; i < sliderList.length; i++) {
        var slider = sliderList[i];
        noUiSlider.create(slider, {
            start: .5,
            range: {
                'min': 0,
                'max': 1
            }
        });
        bindValues(sliderList[i]); // Bind slider value to audio volume
    }
}

function bindValues(slider) {
    slider.noUiSlider.on('update', function (values, handle) {
        slider.parentNode.getElementsByClassName("audio-file")[0].volume = values[handle]; // Get the audio file assoiated with the slider and set its volume
    });
}

enablePlayButtons(playButtonList); // Initialize the play buttons
enableSliders(sliderList); // Initialize the sliders