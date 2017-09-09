(function(){
  var synth = window.speechSynthesis;

  var inputForm = document.querySelector('form.speechForm');
  var inputTxt = document.querySelector('.speechText');
  var voiceSelect = document.querySelector('select.speechSelect');

  var pitch = document.querySelector('#speechpitch');
  var pitchValue = document.querySelector('.speech-pitch-value');
  var rate = document.querySelector('#speechrate');
  var rateValue = document.querySelector('.speech-rate-value');
  var button = inputForm.querySelector('button');

  var voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for(i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function speak(){
    if(inputTxt.value !== ''){
      var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
      var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      for(i = 0; i < voices.length ; i++) {
        if(voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
      }
      utterThis.pitch = pitch.value;
      utterThis.rate = rate.value;
      synth.speak(utterThis);
    }
  }

  inputForm.onsubmit = function(event) {
    event.preventDefault();

    speak();
  };

  pitch.oninput = function() {
    pitchValue.textContent = pitch.value;
  };

  rate.oninput = function() {
    rateValue.textContent = rate.value;
  };

  voiceSelect.onchange = function(){
    speak();
  };
})();