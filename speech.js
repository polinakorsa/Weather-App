window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = false;
recognition.lang = "en-US";

const speechButton = document.getElementById("speech-city-btn");
const citySelector = document.getElementById("city-select");
const citiesArray = ["London", "New York", "Paris", "San Francisco", "Berlin"];



speechButton.addEventListener("click", () => recognition.start());

recognition.addEventListener("result", (event) => {
    const [result] = event.results;
    const transcript = result[0].transcript;
    matchCityToTranscript(transcript);
    matchCurrentWeatherToTranscript(transcript)
});

function matchCityToTranscript(transcript) {

    if(citiesArray.includes(transcript)){
        citySelector.value = transcript;
         getWeatherData(citySelector.value);
    }
}

function matchCurrentWeatherToTranscript(transcript) {
    if (transcript.includes("get my weather")) {
         getCurrWeatherData();
    }
}



