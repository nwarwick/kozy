var audioList = document.getElementById("sb-row1").querySelectorAll(".audio-file"); // Grab all audio files in row 1 of sound board
var playButtonList = document.getElementById("sb-row1").querySelectorAll(".play-button"); 
var sliderList = document.getElementById("sb-row1").querySelectorAll(".slider");
//var masterControl = document.getElementById("master-control-button");
//var audioNoise = true; // Initialize all audio as off

function fixTransitions(audioList) {
    for (var i = 0; i < audioList.length; i++) {
        // Can specify a point at which to replay the audio, to reduce transition interruption.
        audioList[i].addEventListener('timeupdate', function() {
            var buffer = 2;
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 2;
                this.play();
            }
        }, false);
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

//TODO: toggle play
function play() {
    var audio = this.parentNode.getElementsByClassName("audio-file")[0];
    audio.play();
    this.src = "./img/pause.png";
    // Remove old event listeners
    this.parentNode.getElementsByClassName("play-button")[0].className = "pause-button";
    this.parentNode.getElementsByClassName("pause-button")[0].removeEventListener("mouseover", highlightPlayButton, false);
    this.parentNode.getElementsByClassName("pause-button")[0].removeEventListener("mouseout", unHighlightPlayButton, false);
    this.parentNode.getElementsByClassName("pause-button")[0].removeEventListener("click", play, false);
    enablePauseButtons(this.parentNode.getElementsByClassName("pause-button")); // Enable the list of pause buttons Note: More efficient to only enable the current button?
}

//TODO: toggle play/pause
function pause() {
    var audio = this.parentNode.getElementsByClassName("audio-file")[0];
    audio.pause();
    this.src = "./img/play.png";
    this.parentNode.getElementsByClassName("pause-button")[0].className = "play-button";
    // Remove old event listeners
    this.parentNode.getElementsByClassName("play-button")[0].removeEventListener("mouseover", highlightPauseButton, false);
    this.parentNode.getElementsByClassName("play-button")[0].removeEventListener("mouseout", unHighlightPauseButton, false);
    this.parentNode.getElementsByClassName("play-button")[0].removeEventListener("click", pause, false);
    enablePlayButtons(this.parentNode.getElementsByClassName("play-button"));

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

//masterControl.addEventListener("click", toggleSounds);
enablePlayButtons(playButtonList);
enableSliders(sliderList);
fixTransitions(audioList);
