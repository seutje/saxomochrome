(function(){
  var playButton = document.getElementById('audio-source-osc'),
      typeSelect = document.getElementById('audio-source-osc-type'),
      freqRange = document.getElementById('audio-source-osc-freq'),
      volRange = document.getElementsByClassName('master-vol'),
      playSample = document.getElementById('audio-source-sample'),
      playTiming = document.getElementById('audio-source-timing'),
      playTimingLive = document.getElementById('audio-source-timing-live'),
      thereminVid = document.getElementById('theremin-vid'),
      context = Tone.context,
      thereminSrc = context.createMediaElementSource(thereminVid),
      gain = Tone.Master.input,
      osc = context.createOscillator(),
      sampleUrl = 'samples/snare/cd_snare_80s.wav',
      sampleList = [
        'samples/snare/cd_snare_doof.wav',
        'samples/rim/Rim.wav',
        'samples/toms/Tom Low copy 2.wav'
      ],
      sampleRequest = new XMLHttpRequest(),
      sampleSource = context.createBufferSource(),
      simpleSampler = new Tone.Sampler({
        'C4' : 'samples/snare/cd_snare_80s.wav'
      }, function() {
        window.simpleSampler = simpleSampler;
      }).toMaster(),
      dynamicSynth = new Tone.DuoSynth().toMaster(),
      vibratoLFO = new Tone.LFO(0.3, 0, 50),
      duoSynth = new Tone.DuoSynth({
        vibratoAmount: document.getElementById('instVibAm').value,
        vibratoRate: document.getElementById('instVibRt').value,
        harmonicity: document.getElementById('instVibHr').value
      }).toMaster(),
      sequence = ['C4', 'E4', 'G4', 'A4'],
      initSequencer = function() { return new Tone.Sequence(function(time, note) {
        duoSynth.triggerAttackRelease(note, '8n');
      }, sequence, '4n');},
      sequencer,
      bufferLoader,
      snareBuffer,
      rimBuffer,
      tomBuffer;


  var canvas = document.getElementById('oscilloscope');
  var canvasCtx = canvas.getContext('2d');
  var HEIGHT = canvas.height;
  var WIDTH = canvas.width;

  var analyser = context.createAnalyser();
  var bufferLength = analyser.fftSize = 2048;
  var dataArray = new Uint8Array(bufferLength);

  analyser.minDecibels = -100;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  var draw = function() {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    var sliceWidth = WIDTH / bufferLength;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
  };

  draw();

  thereminVid.addEventListener('loadedmetadata', function() {
    this.currentTime = 13;
  }, false);

  thereminSrc.connect(analyser);
  thereminSrc.connect(gain);

  vibratoLFO.connect(dynamicSynth.vibratoAmount);
  vibratoLFO.start();
  sequencer = initSequencer();
  sequencer.loop = 2;
  window.dynamicSynth = dynamicSynth;
  window.vibratoLFO = vibratoLFO;
  window.duoSynth = duoSynth;
  window.sequencer = sequencer;
  window.initSequencer = initSequencer;

  function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
  }

  BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    };

    request.onerror = function() {
      alert('BufferLoader: XHR error');
    };

    request.send();
  };

  BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  };

  var bufferFinishedHandler = function(bufferList) {
    snareBuffer = bufferList[0];
    rimBuffer = bufferList[1];
    tomBuffer = bufferList[2];
  };

  var playSound = function(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(gain);
    source.start(time);
  };

  bufferLoader = new BufferLoader(context, sampleList, bufferFinishedHandler);
  bufferLoader.load();

  osc.start();
  gain.gain.value = volRange[0].value;
  gain.connect(analyser);
  gain.connect(context.destination);
  sampleRequest.open('GET', sampleUrl, true);
  sampleRequest.responseType = 'arraybuffer';
  sampleSource.loop = true;
  sampleRequest.onload = function() {
    // Decode and store buffer
    context.decodeAudioData(sampleRequest.response, function(buffer) {
      sampleSource.buffer = buffer;
      sampleSource.start();
    });
  };
  sampleRequest.send();

  var playHandler = function(e) {
    var active = this.classList.contains('active'),
        state = context.state;

    if (state === 'suspended') {
      context.resume();
    }

    if (!active) {
      osc.type = typeSelect.value;
      osc.frequency.value = freqRange.value;
      osc.connect(gain);
      gain.gain.value = volRange[0].value;
      this.innerText = 'Stop';
      this.classList.add('active');
    }
    else {
      osc.disconnect();
      this.innerText = 'Start';
      this.classList.remove('active');
    }
  };

  var playSampleHandler = function(e) {
    var active = this.classList.contains('active'),
        state = context.state;

    if (state === 'suspended') {
      context.resume();
    }

    if (!active) {
      sampleSource.connect(gain);
      gain.gain.value = volRange[0].value;
      this.innerText = 'Stop';
      this.classList.add('active');
    }
    else {
      sampleSource.disconnect();
      this.innerText = 'Start';
      this.classList.remove('active');
    }
  };

  var playTimingHandler = function() {
    var startTime = context.currentTime + 0.1;
    var tempo = 80;
    var eighthNoteTime = (60 / tempo)  / 2;
    for (var bar = 0; bar < 2; bar++) {
      var time = startTime + bar * 8 * eighthNoteTime;
      // Play the toms drum on beats 1, 5
      playSound(tomBuffer, time);
      playSound(tomBuffer, time + 4 * eighthNoteTime);

      // Play the snare drum on beats 3, 7
      playSound(snareBuffer, time + 2 * eighthNoteTime);
      playSound(snareBuffer, time + 6 * eighthNoteTime);

      // Play the rim every eighthh note.
      for (var i = 0; i < 8; ++i) {
        playSound(rimBuffer, time + i * eighthNoteTime);
      }
    }
  };

  var playTimingLiveHandler = function() {
    var startTime = context.currentTime + 0.1;
    var tempo = 80; // BPM
    var eighthNoteTime = (60 / tempo)  / 2;
    var buffers = {
      tom: tomBuffer,
      snare: snareBuffer,
      rim: rimBuffer
    };
    var channels = {
      tom: [1, 0, 0, 0, 1, 0, 0, 0],
      snare: [0, 0, 1, 0, 0, 0, 1, 0],
      rim: [1, 1, 1, 1, 1, 1, 1, 1]
    };
    var pos = 0;
    var play = function() {
      ['tom', 'snare', 'rim'].forEach(function(chan) {
        if (channels[chan][pos]) {
          playSound(buffers[chan]);
        }
      });
      if (pos !== channels['tom'].length) {
        pos++;
        setTimeout(play, eighthNoteTime * 1000);
      }
    };
    play();
  };

  var typeHandler = function(e) {
    osc.type = this.value;
  };

  var freqHandler = function(e) {
    osc.frequency.value = this.value;
  };

  var volHandler = function(e) {
    var that = this;
    gain.gain.value = that.value;
    Array.prototype.forEach.call(volRange, function(el) {
      el.value = that.value;
    });
  };

  playButton.addEventListener('mousedown', playHandler);
  typeSelect.addEventListener('input', typeHandler);
  freqRange.addEventListener('input', freqHandler);
  Array.prototype.forEach.call(volRange, function(el) {
    el.addEventListener('input', volHandler);
  });
  playSample.addEventListener('mousedown', playSampleHandler);
  playTiming.addEventListener('mousedown', playTimingHandler);
  playTimingLive.addEventListener('mousedown', playTimingLiveHandler);
})();