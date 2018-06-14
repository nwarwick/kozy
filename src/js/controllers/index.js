var audioList = document.querySelectorAll(".audio-file"); // Grab all audio elements
var playButtonList = document.querySelectorAll(".play-button"); //Grab all play buttons
var sliderList = document.querySelectorAll(".slider"); // Grab all sliders
import noUiSlider from 'nouislider';

//-----------------------Button stuff----------------------------

function enablePlayButtons(playButtonList) {
    for (var i = 0; i < playButtonList.length; i++) {
        playButtonList[i].addEventListener("click", playPause, false);
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