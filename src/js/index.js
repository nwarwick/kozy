var audioList = document.querySelectorAll(".audio-file"); // Grab all audio elements
var playButtonList = document.querySelectorAll(".play-button"); //Grab all play buttons
var sliderList = document.querySelectorAll(".slider"); // Grab all sliders
var images = []; // Don't need to use this, it is just for pre-loading images

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
        playButtonList[i].addEventListener("mouseover", highlightPlayButton, false);
        playButtonList[i].addEventListener("mouseout", unHighlightPlayButton, false);
        playButtonList[i].addEventListener("click", play, false);
    }

}

function enablePauseButtons(pauseButtonList) {
    //console.log("Pause button list: " + pauseButtonList);
    for (var i = 0; i < pauseButtonList.length; i++) {
        pauseButtonList[i].addEventListener("mouseover", highlightPauseButton, false);
        pauseButtonList[i].addEventListener("mouseout", unHighlightPauseButton, false);
        pauseButtonList[i].addEventListener("click", pause, false);
    }
}

//TODO: Create master volume and mute control
function toggleSounds() {
    // If audioNoise is true, mute all sounds
    if (audioNoise) {
        for (var i = 0; i < audioList.length; i++) {
            // If audio is playing, pause it
            if (!audioList.paused) {
                audioList[i].pause;
            }
        }
    }
}

function highlightPlayButton() {
    this.src = "./img/play-filled.png";
}

function unHighlightPlayButton() {
    this.src = "./img/play.png";
}

function highlightPauseButton() {
    this.src = "./img/pause-filled.png";
}

function unHighlightPauseButton() {
    //console.log(this);
    this.src = "./img/pause.png";
}


// Probably a better way of doing this
function play() {
    var audio = this.parentNode.getElementsByClassName("audio-file")[0];
    var button = this.parentNode.getElementsByClassName("play-button")[0];
    audio.play();
    this.src = "./img/pause.png"; // Swap to pause image
    button.className = "pause-button";
    button.removeEventListener("mouseover", highlightPlayButton, false); // Remove old event listeners
    button.removeEventListener("mouseout", unHighlightPlayButton, false);
    button.removeEventListener("click", play, false);
    enablePauseButtons(this.parentNode.getElementsByClassName("pause-button")); // Enable listeners for the new pause button
}

// Probably a better way of doing this
function pause() {
    var audio = this.parentNode.getElementsByClassName("audio-file")[0];
    var button = this.parentNode.getElementsByClassName("pause-button")[0];
    audio.pause();
    this.src = "./img/play.png"; // Swap to play image
    button.className = "play-button";
    button.removeEventListener("mouseover", highlightPauseButton, false); // Remove old event listeners
    button.removeEventListener("mouseout", unHighlightPauseButton, false);
    button.removeEventListener("click", pause, false);
    enablePlayButtons(this.parentNode.getElementsByClassName("play-button")); // Enable listeners for the new play button

}

//----------------------------------------------------------

function enableSliders(sliderList) {
    for (var i = 0; i < sliderList.length; i++) {
        var slider = sliderList[i];
        noUiSlider.create(slider, {
            start: 0,
            range: {
                'min': 0,
                'max': 1
            }
        });
        bindValues(sliderList[i]); // Bind slider value to audio volume
    }
}

function bindValues(slider) {
    slider.noUiSlider.on('update', function(values, handle) {
        slider.parentNode.getElementsByClassName("audio-file")[0].volume = values[handle]; // Get the audio file assoiated with the slider and set its volume
    });
}

preloadImages(
    "img/handle.png",
    "img/pause.png",
    "img/play.png",
    "img/pause-filled.png",
    "img/play-filled.png" 
);
enablePlayButtons(playButtonList); // Initialize the play buttons
enableSliders(sliderList); // Initialize the sliders
